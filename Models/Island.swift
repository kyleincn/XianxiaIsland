import Foundation
import CoreGraphics

struct Island: Identifiable {
    let id: String = "xianxia"
    let name: String = "仙侠岛"
    let backgroundMusic: String = "xianxia_bgm"
    var objects: [IslandObject]
    var portals: [Portal]
}

struct IslandObject: Identifiable {
    let id: String
    let type: ObjectType
    let position: CGPoint
    let size: CGSize
    let colorHex: String
    let label: String?

    enum ObjectType {
        case building   // 古建筑
        case npc        // NPC
        case decoration // 装饰
        case cloud      // 云朵
        case floating   // 浮空岛
    }
}

struct Portal {
    let id: String
    let targetIslandId: String
    let position: CGPoint
    let size: CGSize
    let colorHex: String
}
