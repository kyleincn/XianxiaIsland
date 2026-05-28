import SpriteKit

class IslandScene: SKScene {

    // MARK: - Properties

    private var player: SKSpriteNode!
    private var joystickHandler: ((CGVector) -> Void)?

    private let playerSpeed: CGFloat = 160
    private var isMoving = false
    private var currentDirection: CGVector = .zero
    private var moveAction: SKAction?

    // 云海粒子
    private var cloudEmitter: SKEmitterNode?

    // MARK: - Scene Setup

    override func didMove(to view: SKView) {
        backgroundColor = UIColor(red: 0.102, green: 0.102, blue: 0.18, alpha: 1.0) // #1A1A2E

        setupCamera()
        setupBackground()
        setupCloudSea()
        setupFloatingIslands()
        setupPlayer()
    }

    // MARK: - Camera

    private func setupCamera() {
        guard let camera = camera else { return }
        camera.setScale(1.0)
    }

    // MARK: - Background Stars

    private func setupBackground() {
        // 星空背景粒子
        let starField = SKEmitterNode()
        starField.particleBirthRate = 0.5
        starField.numParticlesToEmit = 200
        starField.particleLifetime = 99999
        starField.particlePositionRange = CGVector(dx: 1200, dy: 900)
        starField.particleSize = CGSize(width: 2, height: 2)
        starField.particleColor = .white
        starField.particleColorBlendFactor = 1.0
        starField.emissionAngleRange = .pi * 2
        starField.yAcceleration = 0
        starField.xAcceleration = 0

        // 用多个粒子位置模拟星星
        for _ in 0..<150 {
            let star = SKShapeNode(circleOfRadius: 1)
            star.fillColor = .white
            star.alpha = CGFloat.random(in: 0.2...0.9)
            star.position = CGPoint(
                x: CGFloat.random(in: -600...600),
                y: CGFloat.random(in: -450...450)
            )
            star.name = "star"
            addChild(star)

            // 星星闪烁动画
            let fade = SKAction.sequence([
                SKAction.fadeAlpha(to: 0.2, duration: Double.random(in: 1...3)),
                SKAction.fadeAlpha(to: 1.0, duration: Double.random(in: 1...3))
            ])
            star.run(SKAction.repeatForever(fade))
        }
    }

    // MARK: - Cloud Sea

    private func setupCloudSea() {
        // 底部云海
        let cloudSea = SKEmitterNode()
        cloudSea.particleBirthRate = 5
        cloudSea.numParticlesToEmit = 20
        cloudSea.particleLifetime = 10
        cloudSea.particlePositionRange = CGVector(dx: 1200, dy: 20)
        cloudSea.particlePosition = CGPoint(x: 0, y: -300)
        cloudSea.particleSpeed = 20
        cloudSea.particleSpeedRange = 10
        cloudSea.emissionAngle = .pi / 2
        cloudSea.emissionAngleRange = .pi / 6
        cloudSea.particleAlpha = 0.6
        cloudSea.particleAlphaSpeed = -0.05
        cloudSea.particleScale = 0.3
        cloudSea.particleScaleRange = 0.2
        cloudSea.particleScaleSpeed = 0.02
        cloudSea.particleColor = UIColor(red: 0.96, green: 0.90, blue: 0.78, alpha: 1.0) // 古纸金
        cloudSea.particleColorBlendFactor = 1.0
        cloudSea.yAcceleration = 0
        cloudSea.name = "cloudSea"
        addChild(cloudSea)
        cloudEmitter = cloudSea

        // 额外云雾层
        for i in 0..<5 {
            let cloud = makeCloudNode()
            cloud.position = CGPoint(x: CGFloat.random(in: -500...500), y: CGFloat.random(in: -200...200))
            cloud.zPosition = CGFloat(i) * 0.1
            cloud.name = "cloud_\(i)"
            addChild(cloud)
        }
    }

    private func makeCloudNode() -> SKShapeNode {
        let node = SKShapeNode(circleOfRadius: CGFloat.random(in: 40...80))
        node.fillColor = UIColor(red: 0.96, green: 0.90, blue: 0.78, alpha: 0.3)
        node.strokeColor = .clear

        // 云雾飘动
        let dx = CGFloat.random(in: 20...60)
        let wait = Double.random(in: 2...4)
        let drift = SKAction.sequence([
            SKAction.moveBy(x: dx, y: CGFloat.random(in: -10...10), duration: wait),
            SKAction.moveBy(x: -dx, y: CGFloat.random(in: -10...10), duration: wait)
        ])
        node.run(SKAction.repeatForever(drift))
        return node
    }

    // MARK: - Floating Islands

    private func setupFloatingIslands() {
        // 主岛屿（中心）
        let mainIsland = makeFloatingIsland(
            position: CGPoint(x: 0, y: -100),
            size: CGSize(width: 300, height: 80),
            colorHex: "3D2B1F",
            label: "仙侠主岛"
        )
        addChild(mainIsland)

        // 古风建筑 - 亭子
        let pavilion = makePavilion(position: CGPoint(x: -80, y: -40))
        mainIsland.addChild(pavilion)

        // 古风建筑 - 楼阁
        let tower = makeTower(position: CGPoint(x: 60, y: -50))
        mainIsland.addChild(tower)

        // 左侧浮岛
        let leftIsland = makeFloatingIsland(
            position: CGPoint(x: -320, y: 50),
            size: CGSize(width: 180, height: 60),
            colorHex: "2D4A2D",
            label: "灵草岛"
        )
        addChild(leftIsland)

        // 右侧浮岛
        let rightIsland = makeFloatingIsland(
            position: CGPoint(x: 320, y: -20),
            size: CGSize(width: 200, height: 70),
            colorHex: "1F3D5C",
            label: "飞剑岛"
        )
        addChild(rightIsland)

        // 顶部浮岛
        let topIsland = makeFloatingIsland(
            position: CGPoint(x: 100, y: 200),
            size: CGSize(width: 140, height: 50),
            colorHex: "4A1F4A",
            label: "天宫岛"
        )
        addChild(topIsland)

        // 传送门
        let portal = makePortal(position: CGPoint(x: 320, y: -20))
        rightIsland.addChild(portal)

        // 云海瀑布效果
        let waterfall = makeWaterfall(position: CGPoint(x: 320, y: 0))
        rightIsland.addChild(waterfall)

        // 仙鹤
        let crane = makeCrane(position: CGPoint(x: -200, y: 150))
        addChild(crane)
    }

    private func makeFloatingIsland(position: CGPoint, size: CGSize, colorHex: String, label: String?) -> SKShapeNode {
        let island = SKShapeNode(rectOf: size, cornerRadius: 30)
        island.fillColor = UIColor(hex: colorHex) ?? .brown
        island.strokeColor = UIColor(red: 0.48, green: 0.37, blue: 0.66, alpha: 1.0) // 紫色描边
        island.lineWidth = 3
        island.position = position
        island.name = "floatingIsland"

        // 悬浮动画
        let float = SKAction.sequence([
            SKAction.moveBy(x: 0, y: 8, duration: 2.5),
            SKAction.moveBy(x: 0, y: -8, duration: 2.5)
        ])
        island.run(SKAction.repeatForever(float))

        // 岛屿下的云雾
        let mist = SKEmitterNode()
        mist.particleBirthRate = 2
        mist.numParticlesToEmit = 5
        mist.particleLifetime = 6
        mist.particlePositionRange = CGVector(dx: size.width * 0.8, dy: 5)
        mist.particlePosition = CGPoint(x: 0, y: -size.height / 2)
        mist.particleSpeed = 10
        mist.emissionAngle = .pi / 2
        mist.particleAlpha = 0.5
        mist.particleAlphaSpeed = -0.08
        mist.particleScale = 0.2
        mist.particleScaleSpeed = 0.02
        mist.particleColor = UIColor(red: 0.96, green: 0.90, blue: 0.78, alpha: 1.0)
        island.addChild(mist)

        if let label = label {
            let text = SKLabelNode(text: label)
            text.fontName = "Helvetica-Bold"
            text.fontSize = 14
            text.fontColor = UIColor(red: 0.96, green: 0.90, blue: 0.78, alpha: 0.8)
            text.position = CGPoint(x: 0, y: size.height / 2 + 10)
            island.addChild(text)
        }

        return island
    }

    private func makePavilion(position: CGPoint) -> SKNode {
        let group = SKNode()
        group.position = position

        // 底座
        let base = SKShapeNode(rectOf: CGSize(width: 60, height: 8), cornerRadius: 2)
        base.fillColor = UIColor(hex: "7B5EA7") ?? .purple
        base.strokeColor = .clear
        base.name = "pavilion_base"
        group.addChild(base)

        // 柱子 x4
        let pillarPositions = [(-24, -4), (24, -4), (-24, 4), (24, 4)]
        for (px, py) in pillarPositions {
            let pillar = SKShapeNode(rectOf: CGSize(width: 4, height: 30), cornerRadius: 1)
            pillar.fillColor = UIColor(hex: "F5E6C8") ?? .white
            pillar.strokeColor = .clear
            pillar.position = CGPoint(x: px, y: py + 8)
            group.addChild(pillar)
        }

        // 屋顶
        let roof = SKShapeNode(rectOf: CGSize(width: 80, height: 12), cornerRadius: 3)
        roof.fillColor = UIColor(hex: "E85D75") ?? .red
        roof.strokeColor = .clear
        roof.position = CGPoint(x: 0, y: 26)
        group.addChild(roof)

        // 顶部宝顶
        let top = SKShapeNode(circleOfRadius: 5)
        top.fillColor = UIColor(hex: "F5E6C8") ?? .white
        top.strokeColor = .clear
        top.position = CGPoint(x: 0, y: 36)
        group.addChild(top)

        group.name = "pavilion"
        return group
    }

    private func makeTower(position: CGPoint) -> SKNode {
        let group = SKNode()
        group.position = position

        // 底层
        let floor1 = SKShapeNode(rectOf: CGSize(width: 50, height: 40), cornerRadius: 4)
        floor1.fillColor = UIColor(hex: "7B5EA7") ?? .purple
        floor1.strokeColor = UIColor(hex: "F5E6C8") ?? .white
        floor1.lineWidth = 2
        group.addChild(floor1)

        // 顶层
        let floor2 = SKShapeNode(rectOf: CGSize(width: 36, height: 35), cornerRadius: 3)
        floor2.fillColor = UIColor(hex: "7B5EA7") ?? .purple
        floor2.strokeColor = UIColor(hex: "F5E6C8") ?? .white
        floor2.lineWidth = 2
        floor2.position = CGPoint(x: 0, y: 37)
        group.addChild(floor2)

        // 塔顶
        let roof = SKShapeNode(rectOf: CGSize(width: 20, height: 25), cornerRadius: 2)
        roof.fillColor = UIColor(hex: "E85D75") ?? .red
        roof.strokeColor = .clear
        roof.position = CGPoint(x: 0, y: 68)
        group.addChild(roof)

        group.name = "tower"
        return group
    }

    private func makePortal(position: CGPoint) -> SKShapeNode {
        let portal = SKShapeNode(circleOfRadius: 25)
        portal.fillColor = (UIColor(hex: "7B5EA7") ?? .purple).withAlphaComponent(0.3)
        portal.strokeColor = UIColor(hex: "E85D75") ?? .red
        portal.lineWidth = 3
        portal.name = "portal"

        // 光效动画
        let pulse = SKAction.sequence([
            SKAction.fadeAlpha(to: 0.3, duration: 0.8),
            SKAction.fadeAlpha(to: 1.0, duration: 0.8)
        ])
        portal.run(SKAction.repeatForever(pulse))

        // 旋转
        portal.run(SKAction.repeatForever(SKAction.rotate(byAngle: .pi * 2, duration: 4)))

        return portal
    }

    private func makeWaterfall(position: CGPoint) -> SKEmitterNode {
        let waterfall = SKEmitterNode()
        waterfall.particleBirthRate = 20
        waterfall.numParticlesToEmit = 50
        waterfall.particleLifetime = 2
        waterfall.particlePosition = CGPoint(x: 0, y: 20)
        waterfall.particlePositionRange = CGVector(dx: 5, dy: 0)
        waterfall.particleSpeed = 100
        waterfall.emissionAngle = -.pi / 2
        waterfall.particleAlpha = 0.7
        waterfall.particleAlphaSpeed = -0.3
        waterfall.particleScale = 0.1
        waterfall.particleScaleSpeed = 0.05
        waterfall.particleColor = UIColor(red: 0.5, green: 0.8, blue: 1.0, alpha: 1.0)
        waterfall.yAcceleration = -200
        waterfall.name = "waterfall"
        return waterfall
    }

    private func makeCrane(position: CGPoint) -> SKNode {
        let crane = SKNode()
        crane.position = position

        // 身体
        let body = SKShapeNode(ellipseOf: CGSize(width: 20, height: 12))
        body.fillColor = .white
        body.strokeColor = .clear
        crane.addChild(body)

        // 头
        let head = SKShapeNode(circleOfRadius: 6)
        head.fillColor = .white
        head.strokeColor = .clear
        head.position = CGPoint(x: 10, y: 2)
        crane.addChild(head)

        // 喙
        let beak = SKShapeNode(rectOf: CGSize(width: 8, height: 3), cornerRadius: 1)
        beak.fillColor = UIColor(hex: "F5E6C8") ?? .yellow
        beak.strokeColor = .clear
        beak.position = CGPoint(x: 18, y: 2)
        crane.addChild(beak)

        // 翅膀
        let wing = SKShapeNode(ellipseOf: CGSize(width: 15, height: 8))
        wing.fillColor = UIColor(hex: "1A1A2E") ?? .black
        wing.strokeColor = .clear
        wing.zRotation = -0.3
        wing.position = CGPoint(x: 0, y: 4)
        crane.addChild(wing)

        // 飞行动画
        let fly = SKAction.sequence([
            SKAction.moveBy(x: 80, y: 20, duration: 3),
            SKAction.moveBy(x: -80, y: -20, duration: 3)
        ])
        crane.run(SKAction.repeatForever(fly))

        let flap = SKAction.sequence([
            SKAction.rotate(byAngle: 0.3, duration: 0.3),
            SKAction.rotate(byAngle: -0.3, duration: 0.3)
        ])
        wing.run(SKAction.repeatForever(flap))

        crane.name = "crane"
        return crane
    }

    // MARK: - Player

    private func setupPlayer() {
        player = SKSpriteNode(color: .clear, size: CGSize(width: 60, height: 80))
        player.position = CGPoint(x: 0, y: -70)
        player.zPosition = 100
        player.name = "player"

        buildPlayerNode()

        // 待机动画
        let breathe = SKAction.sequence([
            SKAction.moveBy(x: 0, y: 5, duration: 1.2),
            SKAction.moveBy(x: 0, y: -5, duration: 1.2)
        ])
        player.run(SKAction.repeatForever(breathe), withKey: "breathe")

        addChild(player)
    }

    private func buildPlayerNode() {
        // 角色精灵：Q版小仙侠，色块占位
        // 头
        let head = SKShapeNode(circleOfRadius: 20)
        head.fillColor = UIColor(hex: "F5E6C8") ?? .white // 古纸金肤色
        head.strokeColor = UIColor(hex: "7B5EA7") ?? .purple
        head.lineWidth = 2
        head.name = "head"

        // 身体（白袍）
        let body = SKShapeNode(rectOf: CGSize(width: 30, height: 35), cornerRadius: 8)
        body.fillColor = .white
        body.strokeColor = UIColor(hex: "7B5EA7") ?? .purple
        body.lineWidth = 2
        body.position = CGPoint(x: 0, y: -28)
        body.name = "body"

        // 头发
        let hair = SKShapeNode(rectOf: CGSize(width: 26, height: 16), cornerRadius: 6)
        hair.fillColor = UIColor(hex: "1A1A2E") ?? .black
        hair.strokeColor = .clear
        hair.position = CGPoint(x: 0, y: 8)
        hair.name = "hair"

        // 发髻
        let bun = SKShapeNode(circleOfRadius: 6)
        bun.fillColor = UIColor(hex: "E85D75") ?? .red
        bun.strokeColor = .clear
        bun.position = CGPoint(x: 0, y: 18)
        bun.name = "bun"

        // 披风（飘动）
        let cape = SKShapeNode(rectOf: CGSize(width: 20, height: 25), cornerRadius: 4)
        cape.fillColor = (UIColor(hex: "E85D75") ?? .red).withAlphaComponent(0.8)
        cape.strokeColor = .clear
        cape.position = CGPoint(x: 0, y: -40)
        cape.name = "cape"

        player.addChild(hair)
        player.addChild(bun)
        player.addChild(head)
        player.addChild(body)
        player.addChild(cape)
    }

    // MARK: - Joystick Control

    func setJoystickHandler(_ handler: @escaping (CGVector) -> Void) {
        self.joystickHandler = handler
    }

    func movePlayer(direction: CGVector) {
        currentDirection = direction

        guard direction.length > 0.01 else {
            stopPlayer()
            return
        }

        if !isMoving {
            startMoving()
        }

        // 更新朝向
        let angle = atan2(direction.dy, direction.dx)
        player.zRotation = angle

        // 持续移动
        let dx = direction.dx * playerSpeed
        let dy = direction.dy * playerSpeed

        // 限制在场景范围内
        let newX = max(-550, min(550, player.position.x + dx * 0.016))
        let newY = max(-350, min(350, player.position.y + dy * 0.016))

        // 跟随相机
        player.position = CGPoint(x: newX, y: newY)
        if let camera = camera {
            camera.position = CGPoint(x: newX, y: newY)
        }
    }

    private func startMoving() {
        isMoving = true
        player.removeAction(forKey: "breathe")

        // 行走动画
        let jump = SKAction.sequence([
            SKAction.moveBy(x: 0, y: 8, duration: 0.15),
            SKAction.moveBy(x: 0, y: -8, duration: 0.15)
        ])
        player.run(SKAction.repeatForever(jump), withKey: "walk")

        // 披风飘动加速
        if let cape = player.childNode(withName: "cape") {
            let fastCape = SKAction.sequence([
                SKAction.rotate(byAngle: 0.4, duration: 0.2),
                SKAction.rotate(byAngle: -0.4, duration: 0.2)
            ])
            cape.run(SKAction.repeatForever(fastCape), withKey: "capeMove")
        }
    }

    private func stopPlayer() {
        isMoving = false
        player.removeAction(forKey: "walk")

        let breathe = SKAction.sequence([
            SKAction.moveBy(x: 0, y: 5, duration: 1.2),
            SKAction.moveBy(x: 0, y: -5, duration: 1.2)
        ])
        player.run(SKAction.repeatForever(breathe), withKey: "breathe")

        if let cape = player.childNode(withName: "cape") {
            cape.removeAction(forKey: "capeMove")
            cape.zRotation = 0
        }
    }
}

// MARK: - CGVector Extension

extension CGVector {
    var length: CGFloat {
        sqrt(dx * dx + dy * dy)
    }

    var normalized: CGVector {
        let len = length
        guard len > 0 else { return .zero }
        return CGVector(dx: dx / len, dy: dy / len)
    }
}

// MARK: - UIColor Extension

extension UIColor {
    convenience init?(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3:
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6:
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8:
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            return nil
        }
        self.init(
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            alpha: Double(a) / 255
        )
    }
}
