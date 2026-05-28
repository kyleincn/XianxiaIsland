import SwiftUI

struct VirtualJoystickView: View {
    @Binding var offset: CGSize
    @Binding var isActive: Bool

    var onDirectionChange: (CGVector) -> Void

    private let baseSize: CGFloat = 110
    private let knobSize: CGFloat = 44
    private let maxRadius: CGFloat = 45

    var body: some View {
        ZStack {
            // 底座
            Circle()
                .fill(Color(hex: "7B5EA7").opacity(0.3))
                .overlay(
                    Circle()
                        .stroke(Color(hex: "F5E6C8").opacity(0.4), lineWidth: 2)
                )
                .frame(width: baseSize, height: baseSize)

            // 摇杆旋钮
            Circle()
                .fill(
                    RadialGradient(
                        colors: [Color(hex: "E85D75") ?? .red, Color(hex: "7B5EA7") ?? .purple],
                        center: .center,
                        startRadius: 0,
                        endRadius: knobSize / 2
                    )
                )
                .overlay(
                    Circle()
                        .stroke(Color.white.opacity(0.4), lineWidth: 2)
                )
                .frame(width: knobSize, height: knobSize)
                .shadow(color: Color(hex: "E85D75").opacity(0.5), radius: 8)
                .offset(offset)
        }
        .gesture(
            DragGesture(minimumDistance: 0)
                .onChanged { value in
                    isActive = true
                    let center = CGPoint(x: 0, y: 0)
                    let dragLocation = value.location
                    let dx = dragLocation.x - baseSize / 2
                    let dy = -(dragLocation.y - baseSize / 2) // 翻转 Y 轴

                    let distance = sqrt(dx * dx + dy * dy)
                    let clampedDistance = min(distance, maxRadius)
                    let angle = atan2(dy, dx)

                    let clampedX = cos(angle) * clampedDistance
                    let clampedY = sin(angle) * clampedDistance

                    offset = CGSize(width: clampedX, height: -clampedY)

                    // 归一化方向向量
                    let normalizedDX = distance > 0 ? dx / distance : 0
                    let normalizedDY = distance > 0 ? dy / distance : 0
                    let direction = CGVector(dx: normalizedDX, dy: normalizedDY)
                    onDirectionChange(direction)
                }
                .onEnded { _ in
                    isActive = false
                    offset = .zero
                    onDirectionChange(.zero)
                }
        )
        .animation(.spring(response: 0.15), value: offset)
    }
}
