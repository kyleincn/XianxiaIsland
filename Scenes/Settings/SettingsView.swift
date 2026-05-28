import SwiftUI

struct SettingsView: View {
    @EnvironmentObject var appState: AppState
    @AppStorage("musicEnabled") private var musicEnabled = true
    @AppStorage("sfxEnabled") private var sfxEnabled = true
    @AppStorage("notificationsEnabled") private var notificationsEnabled = true

    var body: some View {
        ZStack {
            Color(hex: "1A1A2E").ignoresSafeArea()

            VStack(spacing: 20) {
                Text("⚙️ 设置")
                    .font(.system(size: 24, weight: .bold))
                    .foregroundColor(Color(hex: "F5E6C8"))
                    .padding(.top, 20)

                ScrollView {
                    VStack(spacing: 16) {
                        // 音乐设置
                        settingsSection(title: "音乐与音效") {
                            settingsToggle(title: "背景音乐", icon: "music.note", isOn: $musicEnabled)
                            settingsToggle(title: "音效", icon: "speaker.wave.2.fill", isOn: $sfxEnabled)
                        }

                        // 通知设置
                        settingsSection(title: "通知") {
                            settingsToggle(title: "灵动岛推送", icon: "bell.fill", isOn: $notificationsEnabled)
                        }

                        // 账号
                        settingsSection(title: "账号") {
                            settingsRow(title: "当前角色", value: appState.avatar.nickname, icon: "person.circle.fill")
                            settingsRow(title: "运动数据", value: "\(appState.motionData.jumpCount) 次", icon: "figure.jumprope")
                        }

                        // 关于
                        settingsSection(title: "关于") {
                            settingsRow(title: "版本", value: "0.1.0", icon: "info.circle.fill")
                            settingsRow(title: "开发者", value: "仙侠工作室", icon: "hammer.fill")
                        }
                    }
                    .padding(.horizontal, 20)
                }

                Spacer()
            }
        }
    }

    // MARK: - Section Builder

    private func settingsSection<Content: View>(title: String, @ViewBuilder content: () -> Content) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.system(size: 13, weight: .semibold))
                .foregroundColor(Color(hex: "F5E6C8").opacity(0.5))
                .padding(.leading, 4)

            VStack(spacing: 0) {
                content()
            }
            .background(
                RoundedRectangle(cornerRadius: 12)
                    .fill(Color(hex: "7B5EA7").opacity(0.15))
                    .overlay(
                        RoundedRectangle(cornerRadius: 12)
                            .stroke(Color(hex: "7B5EA7").opacity(0.3), lineWidth: 1)
                    )
            )
        }
    }

    private func settingsToggle(title: String, icon: String, isOn: Binding<Bool>) -> some View {
        HStack {
            Image(systemName: icon)
                .foregroundColor(Color(hex: "E85D75"))
                .frame(width: 24)

            Text(title)
                .font(.system(size: 15))
                .foregroundColor(Color(hex: "F5E6C8"))

            Spacer()

            Toggle("", isOn: isOn)
                .labelsHidden()
                .tint(Color(hex: "E85D75"))
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 14)
    }

    private func settingsRow(title: String, value: String, icon: String) -> some View {
        HStack {
            Image(systemName: icon)
                .foregroundColor(Color(hex: "E85D75"))
                .frame(width: 24)

            Text(title)
                .font(.system(size: 15))
                .foregroundColor(Color(hex: "F5E6C8"))

            Spacer()

            Text(value)
                .font(.system(size: 14))
                .foregroundColor(Color(hex: "F5E6C8").opacity(0.6))
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 14)
    }
}
