import Foundation

struct Avatar: Codable, Equatable {
    let id: UUID
    var nickname: String
    var skin: SkinConfig

    static let `default` = Avatar(
        id: UUID(),
        nickname: "小仙侠",
        skin: SkinConfig(
            hairColor: "white",
            bodyColor: "purple",
            accentColor: "gold"
        )
    )
}

struct SkinConfig: Codable, Equatable {
    var hairColor: String   // 头发色
    var bodyColor: String   // 衣服色
    var accentColor: String // 点缀色
}
