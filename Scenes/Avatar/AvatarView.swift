import SwiftUI

struct AvatarView: View {
    @EnvironmentObject var appState: AppState
    @State private var nickname: String = "小仙侠"

    private let skinColors = ["white", "black", "gold", "purple", "blue", "red"]
    private let clothColors = ["white", "blue", "purple", "red", "green", "gold"]
    private let accentColors = ["gold", "red", "purple", "blue", "green", "silver"]

    var body: some View {
        ZStack {
            Color(hex: "1A1A2E").ignoresSafeArea()

            VStack(spacing: 20) {
                // 标题
                Text("🎨 角色换装")
                    .font(.system(size: 24, weight: .bold))
                    .foregroundColor(Color(hex: "F5E6C8"))
                    .padding(.top, 20)

                // 角色预览
                characterPreview

                // 昵称编辑
                nicknameEditor

                // 换装选项
                ScrollView {
                    VStack(spacing: 24) {
                        colorPickerSection(title: "肤色", colors: skinColors, selection: $appState.avatar.skin.hairColor)
                        colorPickerSection(title: "衣服", colors: clothColors, selection: $appState.avatar.skin.bodyColor)
                        colorPickerSection(title: "点缀", colors: accentColors, selection: $appState.avatar.skin.accentColor)
                    }
                    .padding(.horizontal, 20)
                }
            }
        }
    }

    // MARK: - Character Preview

    private var characterPreview: some View {
        ZStack {
            // 背景光晕
            Circle()
                .fill(Color(hex: "7B5EA7").opacity(0.2))
                .frame(width: 180, height: 180)
                .blur(radius: 20)

            // Q版角色
            VStack(spacing: 0) {
                // 发髻
                Circle()
                    .fill(Color(hex: "E85D75") ?? .red)
                    .frame(width: 16, height: 16)
                    .offset(y: 8)

                // 头
                Circle()
                    .fill(Color(hex: "F5E6C8") ?? .white)
                    .frame(width: 60, height: 60)
                    .overlay(
                        Circle()
                            .stroke(Color(hex: appState.avatar.skin.bodyColor) ?? .purple, lineWidth: 2)
                    )

                // 头发
                RoundedRectangle(cornerRadius: 10)
                    .fill(Color(hex: "1A1A2E") ?? .black)
                    .frame(width: 65, height: 25)
                    .offset(y: 12)

                // 身体
                RoundedRectangle(cornerRadius: 10)
                    .fill(Color(hex: appState.avatar.skin.bodyColor) ?? .white)
                    .frame(width: 50, height: 55)
                    .overlay(
                        RoundedRectangle(cornerRadius: 10)
                            .stroke(Color(hex: "7B5EA7") ?? .purple, lineWidth: 1.5)
                    )

                // 披风
                RoundedRectangle(cornerRadius: 6)
                    .fill(Color(hex: "E85D75") ?? .red)
                    .frame(width: 35, height: 40)
                    .opacity(0.8)
                    .offset(y: -5)
            }
        }
        .frame(width: 180, height: 200)
        .padding()
    }

    // MARK: - Nickname Editor

    private var nicknameEditor: some View {
        HStack {
            Text("昵称：")
                .foregroundColor(Color(hex: "F5E6C8").opacity(0.7))

            TextField("输入昵称", text: $appState.avatar.nickname)
                .textFieldStyle(.plain)
                .font(.system(size: 16, weight: .medium))
                .foregroundColor(Color(hex: "F5E6C8"))
                .padding(.horizontal, 12)
                .padding(.vertical, 8)
                .background(
                    RoundedRectangle(cornerRadius: 8)
                        .fill(Color(hex: "7B5EA7").opacity(0.3))
                        .overlay(
                            RoundedRectangle(cornerRadius: 8)
                                .stroke(Color(hex: "7B5EA7") ?? .purple, lineWidth: 1)
                        )
                )
        }
        .padding(.horizontal, 20)
    }

    // MARK: - Color Picker Section

    private func colorPickerSection(title: String, colors: [String], selection: Binding<String>) -> some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(title)
                .font(.system(size: 14, weight: .semibold))
                .foregroundColor(Color(hex: "F5E6C8").opacity(0.8))

            LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 12), count: 6), spacing: 12) {
                ForEach(colors, id: \.self) { color in
                    Button {
                        selection.wrappedValue = color
                    } label: {
                        Circle()
                            .fill(colorCircle(for: color))
                            .frame(width: 40, height: 40)
                            .overlay(
                                Circle()
                                    .stroke(
                                        selection.wrappedValue == color ? Color.white : Color.clear,
                                        lineWidth: 3
                                    )
                            )
                    .shadow(
                        color: selection.wrappedValue == color
                            ? Color(hex: "E85D75").opacity(0.6)
                            : .clear,
                        radius: 6
                    )
                    }
                }
            }
        }
    }

    private func colorCircle(for colorName: String) -> some ShapeStyle {
        switch colorName {
        case "white": return AnyShapeStyle(Color.white)
        case "black": return AnyShapeStyle(Color(hex: "1A1A2E") ?? .black)
        case "gold": return AnyShapeStyle(Color(hex: "F5E6C8") ?? .yellow)
        case "purple": return AnyShapeStyle(Color(hex: "7B5EA7") ?? .purple)
        case "blue": return AnyShapeStyle(Color.blue)
        case "red": return AnyShapeStyle(Color(hex: "E85D75") ?? .red)
        case "green": return AnyShapeStyle(Color.green)
        case "silver": return AnyShapeStyle(Color.gray)
        default: return AnyShapeStyle(Color.gray)
        }
    }
}
