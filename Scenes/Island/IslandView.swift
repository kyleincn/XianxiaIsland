import SwiftUI
import SpriteKit

struct IslandView: View {
    @EnvironmentObject var appState: AppState
    @State private var joystickOffset: CGSize = .zero
    @State private var isJoystickActive = false
    @State private var playerDirection: CGVector = .zero

    private let scene = IslandScene(size: CGSize(width: 1200, height: 900))

    var body: some View {
        GeometryReader { geometry in
            ZStack {
                // SpriteKit 岛屿场景
                SpriteView(scene: scene, options: [.allowsTransparency])
                    .ignoresSafeArea()
                    .onReceive(Timer.publish(every: 1.0 / 60.0, on: .main, in: .common).autoconnect()) { _ in
                        if playerDirection.length > 0.01 {
                            scene.movePlayer(direction: playerDirection)
                        }
                    }

                // 岛屿名称标签
                VStack {
                    islandTitle
                    Spacer()
                }

                // 虚拟摇杆
                VStack {
                    Spacer()
                    HStack {
                        VirtualJoystickView(
                            offset: $joystickOffset,
                            isActive: $isJoystickActive,
                            onDirectionChange: { direction in
                                playerDirection = direction
                            }
                        )
                        .frame(width: 140, height: 140)
                        .padding(.leading, 40)
                        .padding(.bottom, 100)

                        Spacer()
                    }
                }

                // 灵动岛状态展示
                VStack {
                    dynamicIslandStatus
                        .padding(.top, 60)
                    Spacer()
                }
            }
        }
        .onAppear {
            scene.scaleMode = .aspectFill
            scene.backgroundColor = UIColor(red: 0.102, green: 0.102, blue: 0.18, alpha: 1.0)
        }
    }

    // MARK: - Subviews

    private var islandTitle: some View {
        Text("☁️ 仙侠岛 ☁️")
            .font(.system(size: 22, weight: .bold, design: .rounded))
            .foregroundColor(Color(hex: "F5E6C8"))
            .shadow(color: Color(hex: "7B5EA7").opacity(0.8), radius: 10)
            .padding(.top, 60)
    }

    private var dynamicIslandStatus: some View {
        HStack(spacing: 8) {
            Image(systemName: "figure.walk")
                .foregroundColor(Color(hex: "E85D75"))
            Text("\(appState.avatar.nickname) · 漫游中")
                .font(.caption)
                .foregroundColor(Color(hex: "F5E6C8"))
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 8)
        .background(
            Capsule()
                .fill(Color(hex: "7B5EA7").opacity(0.6))
                .overlay(
                    Capsule().stroke(Color(hex: "F5E6C8").opacity(0.3), lineWidth: 1)
                )
        )
    }
}
