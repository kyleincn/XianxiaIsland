import SwiftUI
import Combine

enum AppTab: Int, CaseIterable {
    case island = 0
    case avatar
    case backpack
    case friends
    case settings

    var title: String {
        switch self {
        case .island: return "岛屿"
        case .avatar: return "换装"
        case .backpack: return "背包"
        case .friends: return "好友"
        case .settings: return "设置"
        }
    }

    var iconName: String {
        switch self {
        case .island: return "cloud.sun.fill"
        case .avatar: return "person.crop.circle.fill"
        case .backpack: return "bag.fill"
        case .friends: return "person.2.fill"
        case .settings: return "gearshape.fill"
        }
    }
}

class AppState: ObservableObject {
    @Published var selectedTab: AppTab = .island
    @Published var avatar: Avatar = Avatar.default
    @Published var motionData: MotionData = MotionData()
}
