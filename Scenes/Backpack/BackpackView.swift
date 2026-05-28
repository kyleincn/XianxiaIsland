import SwiftUI

struct BackpackView: View {
    @EnvironmentObject var appState: AppState

    private let items = [
        ("飞剑", "⚔️", "blue"),
        ("灵草", "🌿", "green"),
        ("仙丹", "💊", "red"),
        ("符咒", "📜", "purple"),
        ("灵石", "💎", "gold"),
        ("披风", "🧥", "red"),
    ]

    var body: some View {
        ZStack {
            Color(hex: "1A1A2E").ignoresSafeArea()

            VStack(spacing: 20) {
                Text("🎒 背包")
                    .font(.system(size: 24, weight: .bold))
                    .foregroundColor(Color(hex: "F5E6C8"))
                    .padding(.top, 20)

                LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 16), count: 3), spacing: 16) {
                    ForEach(items, id: \.0) { item in
                        itemCard(name: item.0, icon: item.1, colorName: item.2)
                    }
                }
                .padding(.horizontal, 20)

                Spacer()
            }
        }
    }

    private func itemCard(name: String, icon: String, colorName: String) -> some View {
        VStack(spacing: 8) {
            Text(icon)
                .font(.system(size: 36))

            Text(name)
                .font(.system(size: 13, weight: .medium))
                .foregroundColor(Color(hex: "F5E6C8"))
        }
        .frame(width: 100, height: 100)
        .background(
            RoundedRectangle(cornerRadius: 16)
                .fill(Color(hex: colorName).opacity(0.2))
                .overlay(
                    RoundedRectangle(cornerRadius: 16)
                        .stroke(Color(hex: colorName).opacity(0.5), lineWidth: 1.5)
                )
        )
    }
}
