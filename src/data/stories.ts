import type { Story } from "../types";

export const stories: Story[] = [
  {
    id: "under-dome",
    title: "穹顶之下",
    description: "初入仙门的少年，在奇幻世界中收获友谊与成长",
    coverImage: "",
    chapters: [
      {
        id: "ch1-1",
        title: "第一话·天上掉下个大师兄",
        duration: 4,
        content: [
          { type: "text", content: "天穹之上，云海翻涌。一座悬浮的仙门矗立在云端，牌匾上写着四个大字——「星穹派」。" },
          { type: "image", content: "", imageUrl: "" },
          { type: "text", content: "此时，一个穿着粗布衣衫的少年正仰头望着仙门，满脸不可思议。" },
          { type: "dialog", content: "师父，真的要我拜入星穹派？我……我只是个卖豆腐的！" },
          { type: "text", content: "少年名叫林小豆，来自山下的小村庄。这天他像往常一样去镇上卖豆腐，结果一块豆腐砸中了路过的老者——这位老者正是星穹派的掌门。" },
          { type: "dialog", content: "（摸着被豆腐砸中的脑袋）你这小子，豆腐做得好，运气更好。就你了，跟我上山！" },
          { type: "text", content: "林小豆稀里糊涂地被带上了山。他看着周围仙气飘飘的师兄师姐，再看看自己满是黄豆渣的衣服，整个人都懵了。" },
          { type: "image", content: "", imageUrl: "" },
          { type: "dialog", content: "欢迎新师弟！我是大师兄，我叫……等等，让我算算，修行多少年了来着？" },
          { type: "text", content: "一个白衣青年飘然落在林小豆面前，面带微笑，气质出尘。可他接下来的话让林小豆彻底傻了眼——" },
          { type: "dialog", content: "哦，八百三十七年了。对，我是大师兄，你可以叫我……等等，你叫什么来着？" },
          { type: "text", content: "林小豆张了张嘴：「我……我叫林小豆。」" },
          { type: "dialog", content: "林小豆？好名字！以后你就是星穹派第一百三十七代弟子了！豆腐记得给我留一份！" },
        ]
      },
      {
        id: "ch1-2",
        title: "第一话·下（待续）",
        duration: 3,
        content: [
          { type: "text", content: "就这样，林小豆稀里糊涂地开始了他的修仙之路。" },
          { type: "text", content: "第二天一早，他被安排住在山脚的一间小木屋里。说是「木屋」，其实就是一间四面漏风的破草棚。旁边还写着：「此处有结界，妖魔勿入」。" },
          { type: "dialog", content: "（睡眼惺忪地推开门）这就是……我的宿舍？" },
          { type: "text", content: "林小豆看着摇摇欲坠的木门，再看看门口贴着的「豪华山景房」，陷入了沉思。" },
          { type: "dialog", content: "师弟莫急！这可是掌门特意为你安排的！前面那座山叫'漏风崖'，风景绝佳！春天有风，夏天有风，秋天有风，冬天——" },
          { type: "dialog", content: "四季都有风！" },
          { type: "text", content: "林小豆：「……谢谢师兄，我觉得我可能不太适合这里。」" },
          { type: "dialog", content: "别别别！其实……其实房间里有空调的！" },
          { type: "text", content: "「空调？」林小豆眼睛一亮，连忙冲进屋里。角落里，一株仙草正吹着冷气——旁边立着一块牌子：「灵草空调，环保又节能，唯一的缺点是可能会说话」。" },
          { type: "dialog", content: "（灵草发出机械音）您好，我是智能灵草空调。检测到您是新人，赠送您一份「漏风险」，保费每天三颗灵石。" },
          { type: "text", content: "林小豆蹲在地上，双手抱头：「我想回村里卖豆腐……」" }
        ]
      }
    ]
  }
];

export const defaultProgress = {
  currentStoryId: "under-dome",
  currentChapterId: "ch1-1",
  progress: 0,
  completed: false
};