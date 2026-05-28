import SwiftUI

struct FriendsView: View {
    private let friends = [
        ("太白真人", "online", "blue"),
        ("青云仙子", "online", "purple"),
        ("玄天武帝", "offline", "red"),
        ("灵虚子", "away", "green"),
    ]

    var body: some View {
        ZStack {
            Color(hex: "1A1A2E").ignoresSafeArea()

            VStack(spacing: 16) {
                Text("👥 好友")
                    .font(.system(size: 24, weight: .bold))
                    .foregroundColor(Color(hex: "F5E6C8"))
                    .padding(.top, 20)

                ScrollView {
                    VStack(spacing: 12) {
                        ForEach(friends, id: \.0) { friend in
                            friendRow(name: friend.0, status: friend.1, accentColor: friend.2)
                        }
                    }
                    .padding(.horizontal, 20)
                }

                Spacer()
            }
        }
    }

    private func friendRow(name: String, status: String, accentColor: String) -> some View {
        HStack(spacing: 12) {
            // 头像占位
            Circle()
                .fill(Color(hex: accentColor).opacity(0.3))
                .frame(width: 44, height: 44)
                .overlay(
                    Text(String(name.prefix(1)))
                        .font(.system(size: 18, weight: .bold))
                        .foregroundColor(Color(hex: accentColor) ?? .white)
                )

            VStack(alignment: .leading, spacing: 2) {
                Text(name)
                    .font(.system(size: 15, weight: .semibold))
                    .foregroundColor(Color(hex: "F5E6C8"))

                Text(statusText(for: status))
                    .font(.system(size: 12))
                    .foregroundColor(Color(hex: "F5E6C8").opacity(0.5))
            }

            Spacer()

            // 状态指示
            Circle()
                .fill(statusColor(for: status))
                .frame(width: 10, height: 10)
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 12)
        .background(
            RoundedRectangle(cornerRadius: 12)
                .fill(Color(hex: "7B5EA7").opacity(0.15))
                .overlay(
                    RoundedRectangle(cornerRadius: 12)
                        .stroke(Color(hex: "7B5EA7").opacity(0.3), lineWidth: 1)
                )
        )
    }

    private func statusText(for status: String) -> String {
        switch status {
        case "online": return "在线"
        case "offline": return "离线"
        case "away": return "离开"
        default: return status
        }
    }

    private func statusColor(for status: String) -> Color {
        switch status {
        case "online": return .green
        case "offline": return .gray
        case "away": return .yellow
        default: return .gray
        }
    }
}
