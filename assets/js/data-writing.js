/* 写作题库
   结构：{id, type, title, cn, points:[提纲], ex:[必备表达], model:范文, tips:易错提醒} */
window.CET4_WRITING = [
  {
    id: 'W01', type: '议论文（现象+观点）', title: 'On Learning by Using Short Videos',
    cn: '现在很多大学生通过短视频学习英语。请你就这一现象写一篇短文，说明其优点与不足，并提出你的建议。',
    points: ['现象：短视频成为大学生学习英语的常见方式', '优点：碎片时间、内容直观、容易坚持', '不足：注意力分散、知识零散', '建议：以短视频入门，用长文本和练习巩固'],
    ex: ['has become part of daily campus life', 'save time in small fragments', 'scatter our attention', 'it is wise to combine A with B'],
    model: `Short videos have become part of daily campus life, and many students now learn English through them. This trend has clear advantages, but it also carries risks that deserve attention.

On the positive side, short videos make learning convenient. A student can review ten words while waiting for a bus, and lively explanations are easier to remember than dry rules. What is more, the short format lowers the barrier for beginners, so more students are willing to start.

However, the same format scatters attention. Watching ten unconnected clips is not the same as understanding one complete text, and learners may believe they have made progress when they have only collected fragments. To make the habit truly useful, students should treat videos as an entrance rather than a destination, and combine them with longer reading and daily practice. Only in this way can convenience turn into real ability.`,
    tips: '第2、3段分别用 On the positive side / However 形成对比，末段给出做法，避免只写“利大于弊”而无论证。'
  },
  {
    id: 'W02', type: '议论文（观点选择）', title: 'Should Freshmen Take Part-time Jobs?',
    cn: '有人认为大学生做兼职可以锻炼能力，有人认为会耽误学习。请写一篇短文表达你的观点。',
    points: ['引出争议', '兼职的价值：时间管理、沟通能力、了解社会', '风险：占用复习时间、影响作息', '你的立场与前提条件'],
    ex: ['It is widely argued that ...', 'from my point of view', 'on condition that', 'strike a balance between'],
    model: `Whether freshmen should take part-time jobs has been widely discussed on campus. Some students regard a job as valuable training, while others worry that it will take time from their studies.

Those who support it point to the skills that no classroom can teach. A part-time job forces a student to manage time, deal with customers and understand how an organisation works. For students who have never worked, the experience can be far more impressive than another certificate.

In my opinion, however, the value of a job depends on its conditions. If the working hours are limited to weekends and the income covers basic expenses, the experience is worth having. If a student works late nights and misses morning classes, the loss is clearly greater than the gain. Therefore, the question is not whether to work, but how much and when.`,
    tips: '观点题必须在首段末或末段明确表态，不能两边都不得罪。'
  },
  {
    id: 'W03', type: '图表/数据描述', title: 'Where College Students Spend Their Time',
    cn: '下表显示某高校学生每天时间分配的调查结果（学习 4.5 小时、手机娱乐 3.2 小时、运动 0.6 小时、社交 1.8 小时）。请描述并评论。',
    points: ['首段概括最突出的数据', '第二段对比：手机娱乐时间接近学习时间', '第三段原因分析', '第四段建议'],
    ex: ['According to the survey', 'account for', 'compared with', 'it is worth noting that'],
    model: `According to a recent survey in a certain university, students spend about 4.5 hours a day on study, 3.2 hours on mobile entertainment, 1.8 hours on social activities and only 0.6 hour on physical exercise.

The most striking figure is the second one. Time spent on phones is now close to time spent on study, which suggests that the phone has become a competitor rather than a tool. Compared with these two items, exercise takes up less than fifteen percent of the total.

Two reasons may explain the pattern. First, short videos provide instant pleasure, while study requires patience before any reward appears. Second, exercise demands effort and a proper place, and many students simply do not plan for it.

In my view, the solution is not to forbid the phone but to plan the day. If students set aside one hour for exercise and put their phones away during study hours, the same twenty-four hours can produce far better results.`,
    tips: '图表作文先描述数据再评论；描述时抓最大/最小/对比，不要罗列全部数字。'
  },
  {
    id: 'W04', type: '书信/email', title: 'A Letter to a Friend About Exam Preparation',
    cn: '你的朋友李明即将参加四级考试，感到焦虑。请给他写一封信，介绍你的备考经验并鼓励他。',
    points: ['问候与理解对方心情', '分享你的备考方法（1-2 条）', '鼓励与祝愿', '署名 Li Hua'],
    ex: ['I am sorry to hear that', 'What worked for me was ...', 'There is no need to panic', 'I am confident that'],
    model: `Dear Li Ming,

I am sorry to hear that you are worried about the coming CET-4. Please do not panic, because anxiety before an exam is completely normal and it can be settled with a clear plan.

What worked for me was a fixed daily routine. Every evening I reviewed twenty words and finished one listening passage, and I marked my progress on a chart. Seeing the chart filled with ticks gave me far more confidence than any encouraging words. I also kept a mistake notebook, which stopped me from repeating the same errors.

Since two months is enough time, I suggest that you start with vocabulary and listening rather than with complete tests. There is no need to compare your speed with others; the only useful comparison is with yourself last week. I am confident that you will do well, and I am always ready to help.

Yours,
Li Hua`,
    tips: '书信必须有称呼和署名；正文避免使用缩写 I am 写成 I am 更稳妥。'
  },
  {
    id: 'W05', type: '议论文（因果）', title: 'Why Reading Habits Are Declining',
    cn: '有人发现大学生的课外阅读量正在下降。请分析原因并提出建议。',
    points: ['现象：课外阅读时间减少', '原因一：娱乐方式更即时', '原因二：任务式阅读代替兴趣阅读', '建议：降低门槛、组队阅读、固定时间'],
    ex: ['a noticeable decline in', 'be attributed to', 'the primary reason lies in', 'to reverse the trend'],
    model: `A noticeable decline in extracurricular reading has been reported on many campuses. Although students still read a great deal of material for their courses, few read a book of their own choice to the end.

Two factors may be responsible. The first is competition from entertainment. Videos provide pleasure immediately, while a book rewards the reader only after several chapters, and few students are willing to wait. The second is the way reading is organised. When all reading is done for an assignment, the habit is connected with pressure instead of pleasure, and it disappears once the task is finished.

To reverse the trend, we need measures that lower the barrier. A book club that meets twice a month, a shelf of light reading near the dining hall and a fixed half hour before bed are all simple ideas, yet they work because they make reading the easiest choice rather than the hardest one.`,
    tips: '因果类作文把“原因”和“措施”分工写清，避免原因里混入建议。'
  },
  {
    id: 'W06', type: '谚语/名言论述', title: 'Where There Is a Will, There Is a Way',
    cn: '请就谚语“有志者事竟成”写一篇短文，结合实际谈谈你的理解。',
    points: ['解释谚语含义', '举例说明坚持的作用', '个人体会', '总结'],
    ex: ['the proverb tells us that', 'take ... as an example', 'persistence pays off', 'as far as I am concerned'],
    model: `The proverb "Where there is a will, there is a way" tells us that a determined person will always find a method, while a person without determination will always find an excuse.

The truth of this saying can be seen in daily study. Take listening practice as an example. Many students give up after two weeks because their scores do not rise at once. Those who continue for two months, however, usually find that the same passage becomes clear almost overnight. The difference is not talent but persistence.

As far as I am concerned, willingness is not a feeling that appears before action; it grows inside action. When I set a small target that I can certainly reach every day, I stop waiting for motivation. In short, persistence pays off, and the person who keeps walking arrives earlier than the one who starts fast and stops halfway.`,
    tips: '谚语作文要先“解释”再“举例”再“联系自身”，三层缺一不可。'
  },
  {
    id: 'W07', type: '议论文（科技）', title: 'Artificial Intelligence and Learning',
    cn: '人工智能工具正在进入校园。请写一篇短文，谈谈它对学生学习的影响以及你如何使用它。',
    points: ['现象与背景', '积极影响：个性化辅导、即时反馈', '风险：依赖、代替思考', '你的使用原则'],
    ex: ['play an increasingly important role', 'instant feedback', 'run the risk of', 'the key lies in how we use it'],
    model: `Artificial intelligence tools are playing an increasingly important role in campus life. From translation apps to writing assistants, they have changed the way students deal with information.

The benefits are easy to see. An AI tool can explain a difficult sentence at any hour, provide instant feedback on a draft and adapt exercises to a student level. For learners who are too shy to ask questions in class, this kind of support is genuinely valuable.

At the same time, students run the risk of giving away the very practice that makes them improve. If an essay is produced entirely by a machine, the writer learns nothing except how to copy.

In my opinion, the key lies in how we use the tool. I use it to check my reasoning and to find my own mistakes, but I always write the first draft myself. Used in this way, AI becomes a coach rather than a replacement, and the progress it supports belongs to me alone.`,
    tips: '科技类作文要写“如何用”而不是只写“好或坏”，结尾表明自己的使用原则更有说服力。'
  },
  {
    id: 'W08', type: '议论文（校园生活）', title: 'Should Students Live in Dormitories?',
    cn: '有些学生选择在校外租房。请比较住宿舍和校外租房的优缺点，并说明你的选择。',
    points: ['引出两种选择', '校内宿舍：成本低、离教室近、社交机会多、安静度低', '校外租房：自由、安静、成本高、通勤时间长', '你的选择与理由'],
    ex: ['compared with', 'on the one hand ... on the other hand', 'weigh the advantages against the disadvantages', 'in the long run'],
    model: `Living on and off campus are both common choices for students, and each has its own price.

Living in a dormitory costs far less and puts the classroom within a five-minute walk. It also creates social contact that is hard to find elsewhere: a roommate who explains a difficult point at midnight is worth a dozen online posts. The weakness is the lack of quiet. When four people share one room, concentration depends on everyone's agreement.

Renting a flat outside offers control. A student can study in silence and keep a regular schedule. Yet the rent may be three times higher, and the time spent on the road is often underestimated.

In the long run, I prefer the dormitory, because the money and the minutes saved can be invested in study, and the social skills learned there are part of university education itself.`,
    tips: '比较类作文把两方的优劣分别写在两段，最后一段给出带条件的结论。'
  },
  {
    id: 'W09', type: '应用文（活动通知）', title: 'An English Corner Notice',
    cn: '学生会将举办英语角活动，请写一则通知：时间、地点、活动内容、报名方式与注意事项。',
    points: ['标题 Notice', '活动目的与时间地点', '内容安排', '报名方式与要求'],
    ex: ['be scheduled to', 'those who are interested', 'sign up for', 'turn off your phone'],
    model: `Notice

In order to give students more chances to speak English outside the classroom, the Students Union is going to hold an English Corner this Friday from seven to eight thirty in the small garden in front of the library.

The activity will begin with a free talk about campus life, followed by a fifteen-minute word game and a discussion in small groups. Two exchange students will join us, so please prepare one question to ask them.

Those who are interested should sign up for it at the office of the Students Union before Thursday noon, or send a message to the WeChat account printed below. Since the groups are limited to ten people, please be quick. Bring a notebook if you wish, and turn off your phone during the discussion.

The Students Union`,
    tips: '通知标题单独一行；正文按“目的—安排—要求”的顺序写，注意时态用将来时。'
  },
  {
    id: 'W10', type: '议论文（社会热点）', title: 'Coping with Exam Pressure',
    cn: '越来越多的大学生感到考试压力。请分析压力的来源，并介绍有效的应对方法。',
    points: ['现象引入', '来源：竞争、期望、时间不足', '方法：计划、分级目标、运动与睡眠、求助', '总结：压力可以转化为动力'],
    ex: ['suffer from', 'be under great pressure', 'take effective measures', 'turn pressure into motivation'],
    model: `More and more college students say they are under great pressure before exams. The problem deserves attention, because pressure that is not handled properly damages both health and performance.

Pressure usually comes from three directions: fierce competition for limited places, high expectations from family, and the feeling that there is never enough time. These factors combine especially in the last month, when every unfinished task seems urgent.

Fortunately, effective measures do exist. A written plan turns a vague worry into concrete steps, and dividing a large goal into daily tasks keeps progress visible. Regular exercise and adequate sleep protect memory, while talking with a friend or a teacher reduces the sense of isolation. My own habit is to review for forty minutes and then walk for ten, which prevents the tiredness that makes me panic.

In short, pressure itself is not the enemy. If we respond with a plan rather than with worry, it can be turned into motivation.`,
    tips: '建议类段落用 A written plan / exercise / talking 三个具体做法，避免空喊“放松心情”。'
  },
  {
    id: 'W11', type: '议论文（能力培养）', title: 'The Most Important Skill in University',
    cn: '你认为大学期间最重要的能力是什么？请说明理由并举例。',
    points: ['明确提出你认为最重要的能力', '理由一：影响长期学习效率', '理由二：决定职业发展空间', '例子与总结'],
    ex: ['in my view the most valuable ability is', 'make a difference to', 'in the long term', 'as the saying goes'],
    model: `If I were asked to name the most important ability in university, I would choose self-directed learning rather than any single subject.

The reason is simple. Knowledge is updated faster than any course can cover, so the ability to find, judge and organise information decides how much a graduate can still learn five years later. A student who can plan a term of study alone will not be lost when there is no teacher to follow.

This ability also makes a difference to career development. Employers value people who can identify a problem and learn the tools to solve it, because such people need less supervision. In the long term, that advantage grows, while a memorised fact is worth less every year.

To develop it, I set aside one hour each week to learn something outside my major and to write a short summary. Small as it is, this habit decides the direction of my years after graduation.`,
    tips: '“最重要”类题目只需选一个并深挖，多选等于没选。'
  },
  {
    id: 'W12', type: '议论文（环境保护）', title: 'Living a Low-carbon Campus Life',
    cn: '请就“低碳校园”写一篇短文，说明低碳生活的意义以及学生可以做些什么。',
    points: ['意义：资源与环境', '校园中的浪费现象', '具体行动：3 条', '呼吁'],
    ex: ['low-carbon lifestyle', 'make a difference', 'every effort counts', 'reduce the use of'],
    model: `A low-carbon lifestyle is no longer a slogan; it is a practical answer to a real problem. Energy and materials are limited, and the waste produced on a single campus can be surprisingly large.

Students often add to that waste without noticing. Food is left on plates because the portion is fixed, plastic cups are used once and thrown away, and lights stay on in empty classrooms. None of these habits is intended to harm anyone, yet together they produce a serious effect.

Fortunately, three simple changes are within our reach: carry a water bottle instead of buying drinks, take only the food you can finish, and turn off the lights when you leave. Each action seems small, but every effort counts, and habits spread quickly among roommates.

If several thousand students make these choices on the same day, the campus becomes a demonstration of a better way of living.`,
    tips: '环保类作文重点在“具体行动”，列举 3 条比泛泛论述更有说服力。'
  },
  {
    id: 'W13', type: '议论文（教育与考试）', title: 'Are Exams the Best Way to Judge Students?',
    cn: '考试是评价学生的主要方式，但它是否足够？请写一篇短文表达你的观点。',
    points: ['考试的作用与优点', '局限：仅测部分能力、偶然性、压力', '替代或补充方式', '结论：需要组合评价'],
    ex: ['serve as', 'a reliable measure of', 'to some extent', 'in addition to exams'],
    model: `Exams serve as the most widely used measure of student performance, and they have obvious advantages. They are organised in the same way for everyone, so the results can be compared, and a well-designed test does show whether the basic knowledge has been mastered.

To some extent, however, a single score is an incomplete picture. A written test can rarely judge teamwork, creativity or practical skills, and it also reflects conditions such as health and mood on one particular day.

Therefore, a fairer system should combine several sources of evidence. In addition to exams, a course could include a project, a presentation and a record of daily participation, so that a student who works slowly but deeply is not judged only by speed.

Such a change does not mean exams should be abandoned. It means that they should be one important element in a fuller picture rather than the whole picture.`,
    tips: '辩证类题目可用“优点—局限—组合方案—不极端结论”的结构。'
  },
  {
    id: 'W14', type: '应用文（推荐/申请）', title: 'Applying to Be a Volunteer',
    cn: '国际会议招募志愿者，请写一封申请信：自我介绍、优势、可服务时间、期待。',
    points: ['称呼与写信目的', '个人优势（英语、经验、性格）', '时间与承诺', '期待与联系方式'],
    ex: ['I am writing to apply for', 'I am confident that I am qualified for', 'be available on weekends', 'I would appreciate it if'],
    model: `Dear Sir or Madam,

I am writing to apply for the position of volunteer at the international conference to be held in our city next month.

I am a second-year student majoring in English, and I am confident that I am qualified for the task. I have taken part in the campus English Corner for a year, where I helped exchange students with directions and daily needs, so I am comfortable communicating with people from different backgrounds. Being patient and well organised, I am used to dealing with unexpected problems calmly.

As for my schedule, I am available on weekends and every evening after six, and I can promise at least four hours a day during the conference.

I would appreciate it if you could consider my application. I would be glad to provide any further information at your convenience.

Yours sincerely,
Li Hua`,
    tips: '申请信先写目的，再把“优势”和“时间”分开写，末段礼貌收尾。'
  },
  {
    id: 'W15', type: '议论文（职业规划）', title: 'Choosing a Job: Interest or Salary?',
    cn: '选择工作时，有人看重兴趣，有人看重薪资。请写一篇短文表达你的看法。',
    points: ['两种观点的依据', '兴趣的长期价值', '薪资的现实意义', '你的平衡方案'],
    ex: ['when it comes to', 'in the short term', 'in the long run', 'a reasonable balance'],
    model: `When it comes to choosing a job, people divide into two groups. Some insist on following their interest, while others argue that salary should come first.

Those who value interest have a long-term logic. A person who enjoys the work tends to stay in the field long enough to become skilled, and skill eventually raises both income and satisfaction. In the long run, this choice often proves wiser than chasing the highest starting salary.

Yet salary is not a shallow concern. In the short term, it decides where you can live and whether you can support your family, and a job that cannot cover basic needs will damage even the most passionate worker.

In my view, the two goals can be balanced. Choose a field that interests you, and among the offers in that field, take the one that pays fairly and leaves room to grow. Such a choice respects both reality and ambition.`,
    tips: '双观点类作文用“两方各一段 + 我的平衡方案”最稳，不要简单折中成“都重要”。'
  },
  {
    id: 'W16', type: '议论文（健康）', title: 'Staying Healthy in a Busy Term',
    cn: '学业繁忙时很多学生忽视健康。请就如何保持健康写一篇短文。',
    points: ['现象与后果', '方法一：作息与睡眠', '方法二：运动与饮食', '方法三：情绪与社交支持'],
    ex: ['be too busy to', 'at the cost of', 'build into your routine', 'a short break makes a difference'],
    model: `When deadlines gather at the end of a term, health is usually the first thing to be sacrificed. Students skip meals, sleep less and sit for hours, and the bill arrives just before the exams in the form of illness and poor concentration.

The most valuable change is to protect sleep. A fixed bedtime is more effective than an occasional long night, because memory is consolidated during regular deep sleep. Second, exercise should be built into the routine rather than added when there is spare time. Twenty minutes of running three times a week is enough to lift both energy and mood. Third, food and friends matter as well. Regular meals and one honest conversation a day reduce the stress that no vitamin can cure.

These habits appear to cost time, yet they actually protect it. A student who is healthy studies faster, remembers more and panics less.`,
    tips: '健康类作文用“三点建议”结构清晰，每点先写做法后写效果。'
  }
];

/* 翻译题库
   结构：{id, topic, zh, en, keys:[关键词], hard:[难点解析]} */
window.CET4_TRANSLATION = [
  {
    id: 'T01', topic: '饮食文化', zh: '茶是中国人日常生活中最常见的饮料之一。中国人饮茶的历史可以追溯到几千年前。如今，茶不仅是一种饮品，更是一种文化。在许多城市，人们喜欢在茶馆里与朋友聊天，一边品茶一边交流。近年来，越来越多的年轻人也开始喜欢喝茶，这使传统茶文化重新受到关注。',
    en: 'Tea is one of the most common drinks in the daily life of Chinese people. The history of tea drinking in China can be traced back thousands of years. Today, tea is not only a drink but also a culture. In many cities, people like to chat with friends in teahouses, enjoying tea while talking with each other. In recent years, more and more young people have begun to enjoy tea, which has brought traditional tea culture back into the public eye.',
    keys: ['be traced back to', 'not only ... but also', 'more and more young people', 'bring ... back into the public eye'],
    hard: ['“可以追溯到”用 can be traced back to；“一边…一边…”用 while 分词结构；“重新受到关注”可译为 has drawn public attention again。']
  },
  {
    id: 'T02', topic: '传统节日', zh: '中秋节是中国最重要的传统节日之一。这一天，家人通常会团聚在一起，共同赏月、吃月饼。月饼是圆的，象征着团圆和美满。随着社会的发展，人们庆祝中秋的方式有了变化，但家人团聚的意义始终没有改变。对许多在外工作的人来说，中秋是回家的重要理由。',
    en: 'The Mid-Autumn Festival is one of the most important traditional festivals in China. On this day, family members usually get together to admire the moon and eat mooncakes. Mooncakes are round, which symbolizes reunion and happiness. With the development of society, the way people celebrate the festival has changed, but the meaning of family reunion has never changed. For many people working away from home, the festival is an important reason to go back.',
    keys: ['get together', 'symbolize reunion', 'with the development of', 'working away from home'],
    hard: ['“象征”可用 symbolize 或 be a symbol of；“在外工作的人”译为 people working away from home；“始终没有改变”用 has never changed 更自然。']
  },
  {
    id: 'T03', topic: '交通出行', zh: '近年来，中国的高速铁路发展迅速，已成为许多人出行的首选。高铁不仅速度快，而且准时、舒适。它把许多原本需要十几个小时的城市连接起来，使人们可以在同一天往返。高铁的发展也带动了沿线小城市的旅游和经济。越来越多的外国游客选择乘坐高铁游览中国。',
    en: 'In recent years, China\'s high-speed railway has developed rapidly and has become the first choice for many travellers. High-speed trains are not only fast but also punctual and comfortable. They connect many cities that used to require more than ten hours of travel, so that people can go and return on the same day. The development of high-speed rail has also promoted tourism and the economy of small cities along the lines. More and more foreign tourists choose to travel around China by high-speed train.',
    keys: ['high-speed railway', 'punctual', 'used to require', 'along the lines'],
    hard: ['“首选”用 the first choice；“原本需要”用 used to require；“沿线”译为 along the lines 或 along the route。']
  },
  {
    id: 'T04', topic: '教育发展', zh: '中国的教育事业在过去的几十年里取得了巨大成就。九年义务教育的普及使更多孩子有机会上学。近年来，高等教育规模不断扩大，越来越多的年轻人能够进入大学学习。同时，政府也在努力改善农村地区的教育条件，让每个孩子都能接受公平的教育。',
    en: 'China has made great achievements in education over the past few decades. The spread of nine-year compulsory education has given more children the chance to go to school. In recent years, the scale of higher education has continued to expand, and more and more young people are able to study at university. At the same time, the government is working to improve educational conditions in rural areas so that every child can receive a fair education.',
    keys: ['make great achievements in', 'compulsory education', 'higher education', 'rural areas'],
    hard: ['“普及”译为 the spread / the popularisation of；“规模不断扩大”用 continue to expand；“公平的教育”用 a fair education。']
  },
  {
    id: 'T05', topic: '环境保护', zh: '环境保护已成为全球关注的重要问题。空气和水污染不仅影响人们的生活质量，也威胁着人们的健康。为了改善环境，中国采取了许多措施，例如推广清洁能源和限制一次性塑料制品的使用。越来越多的普通人也开始从日常生活做起，节约用水用电，减少浪费。',
    en: 'Environmental protection has become an important issue of global concern. Air and water pollution not only affects the quality of people\'s lives but also threatens their health. In order to improve the environment, China has taken many measures, such as promoting clean energy and limiting the use of disposable plastics. More and more ordinary people are beginning to start with their daily lives, saving water and electricity and reducing waste.',
    keys: ['be of global concern', 'threaten', 'take measures', 'disposable plastics'],
    hard: ['“全球关注”可用 of global concern；“一次性塑料制品”译为 disposable plastics；“从日常生活做起”用 start with daily life。']
  },
  {
    id: 'T06', topic: '移动支付', zh: '如今在中国，移动支付已经非常普遍。无论是购物、乘公交还是买早餐，人们只需用手机扫一下二维码即可完成付款。这种方式既方便又节省时间，因此受到各个年龄段人群的欢迎。不过，也有人担心个人信息的安全，因此相关部门正在不断完善相关法律法规。',
    en: 'Mobile payment is now very common in China. Whether people are shopping, taking a bus or buying breakfast, they only need to scan a QR code with their phones to pay. This method is both convenient and time-saving, so it is popular with people of all ages. However, some people worry about the security of personal information, so the relevant departments are working to improve the related laws and regulations.',
    keys: ['mobile payment', 'scan a QR code', 'be popular with', 'laws and regulations'],
    hard: ['“无论…还是…”用 whether ... or ...；“受到…欢迎”用 be popular with；“相关部门”译为 the relevant departments。']
  },
  {
    id: 'T07', topic: '旅游与文化', zh: '中国的许多古老城镇吸引了大量游客。这些城镇保留了传统的建筑和生活方式，是了解中国历史的重要窗口。近年来，一些地方在保护古建筑的同时发展旅游，取得了良好的效果。游客不仅可以欣赏美景，还能体验当地的传统文化，例如手工艺和传统美食。',
    en: 'Many ancient towns in China attract a large number of tourists. These towns have preserved their traditional architecture and way of life, and they serve as an important window on Chinese history. In recent years, some places have developed tourism while protecting old buildings, and the results have been good. Visitors can not only enjoy the beautiful scenery but also experience local traditional culture, such as handicrafts and traditional food.',
    keys: ['preserve', 'serve as a window on', 'while protecting', 'handicrafts'],
    hard: ['“是了解…的窗口”用 serve as a window on；“在保护的同时发展旅游”用 develop ... while protecting ...。']
  },
  {
    id: 'T08', topic: '网络购物', zh: '网络购物已经成为中国人生活的一部分。人们可以在网上买到几乎所有东西，并且通常能在几天内收到商品。网络购物不仅节省时间，还能让人比较不同商店的价格。当然，也有消费者因为看不到实物而不满意。因此，在网购时选择信誉好的商家非常重要。',
    en: 'Online shopping has become part of the lives of Chinese people. People can buy almost everything on the Internet and usually receive the goods within a few days. Online shopping not only saves time but also allows people to compare prices in different shops. Of course, some consumers are not satisfied because they cannot see the real products. Therefore, it is very important to choose sellers with a good reputation when shopping online.',
    keys: ['online shopping', 'within a few days', 'compare prices', 'reputation'],
    hard: ['“信誉好的商家”译为 sellers with a good reputation；“实物”用 the real product；“因此”用 Therefore 引导结论。']
  },
  {
    id: 'T09', topic: '中医与健康', zh: '中医在中国有悠久的历史。它强调预防疾病和保持身体平衡，而不只是治疗已经出现的症状。近年来，越来越多的人开始重视中医的养生方法，例如按时作息、合理饮食和适度运动。一些外国人也在学习中医，希望从中找到保持健康的方法。',
    en: 'Traditional Chinese medicine has a long history in China. It emphasizes preventing disease and keeping the body in balance rather than only treating symptoms that have already appeared. In recent years, more and more people have begun to value the health-preserving methods of traditional Chinese medicine, such as keeping regular hours, eating reasonably and exercising moderately. Some foreigners are also studying it, hoping to find a way to stay healthy.',
    keys: ['traditional Chinese medicine', 'emphasize', 'rather than', 'keep ... in balance'],
    hard: ['“养生”可译为 health preservation；“按时作息”用 keep regular hours；“适度运动”译为 exercise moderately。']
  },
  {
    id: 'T10', topic: '家庭与代际', zh: '在中国，家庭在人们的生活中占有非常重要的地位。许多年轻人即使在外地工作，也会在节日期间回家看望父母。随着通讯技术的发展，人们可以通过视频通话随时联系家人，这在一定程度上缓解了距离带来的不便。尊重长辈、关心家人仍然是中国社会普遍认可的美德。',
    en: 'In China, family plays a very important role in people\'s lives. Even if many young people work in other cities, they still go home to visit their parents during festivals. With the development of communication technology, people can contact their family at any time through video calls, which to some extent reduces the inconvenience caused by distance. Respecting elders and caring for family members are still widely recognised virtues in Chinese society.',
    keys: ['play an important role in', 'even if', 'to some extent', 'virtue'],
    hard: ['“即使…也…”用 even if ... still ...；“在一定程度上”译为 to some extent；“美德”用 virtue。']
  },
  {
    id: 'T11', topic: '科技与生活', zh: '智能手机已经成为人们生活中不可缺少的工具。它不仅用于通话，还可以用来学习、工作和娱乐。然而，过度使用手机也会带来问题，例如影响睡眠和减少面对面交流。因此，合理安排使用手机的时间对每个人都很重要。',
    en: 'Smartphones have become an indispensable tool in people\'s lives. They are used not only for making calls but also for study, work and entertainment. However, overusing phones can also cause problems, such as affecting sleep and reducing face-to-face communication. Therefore, arranging the time spent on phones reasonably is important for everyone.',
    keys: ['indispensable', 'not only ... but also', 'face-to-face communication', 'reasonably'],
    hard: ['“不可缺少的”用 indispensable；“过度使用”译为 overuse；“面对面交流”用 face-to-face communication。']
  },
  {
    id: 'T12', topic: '阅读与图书馆', zh: '图书馆是大学里最重要的场所之一。它不仅提供书籍和资料，还为学生提供了安静的学习环境。许多学生喜欢在图书馆复习功课，因为那里能让他们集中注意力。近年来，许多图书馆延长了开放时间，并增加了电子资源，以满足学生的不同需求。',
    en: 'The library is one of the most important places in a university. It not only provides books and materials but also offers a quiet environment for study. Many students like to review their lessons in the library because it helps them concentrate. In recent years, many libraries have extended their opening hours and added electronic resources to meet the different needs of students.',
    keys: ['offer a quiet environment', 'concentrate', 'extend opening hours', 'meet the needs of'],
    hard: ['“集中注意力”译为 concentrate；“满足不同需求”用 meet the different needs of；“电子资源”译为 electronic resources。']
  },
  {
    id: 'T13', topic: '体育与奥运', zh: '体育运动在中国越来越受欢迎。越来越多的人意识到，规律的锻炼不仅能增强体质，还能缓解压力。2008 年北京奥运会之后，许多城市增加了体育设施，为居民提供了更多运动的机会。如今，跑步、游泳和球类运动是大学生最常参加的项目。',
    en: 'Sports are becoming increasingly popular in China. More and more people have realised that regular exercise can not only build up their health but also relieve stress. After the 2008 Beijing Olympic Games, many cities added sports facilities, providing residents with more chances to exercise. Today, running, swimming and ball games are the activities that college students take part in most often.',
    keys: ['build up health', 'relieve stress', 'sports facilities', 'take part in'],
    hard: ['“增强体质”用 build up health；“缓解压力”译为 relieve stress；“为…提供机会”用 provide sb with chances。']
  },
  {
    id: 'T14', topic: '城乡变化', zh: '过去二十年里，中国的许多农村地区发生了巨大变化。道路修到了村口，网络覆盖了大部分家庭，人们的生活更加方便。与此同时，一些年轻人选择到城市工作，农村的人口结构因此发生了改变。如何让农村既保持活力又保留传统，是一个值得思考的问题。',
    en: 'Great changes have taken place in many rural areas of China over the past twenty years. Roads have been built to the entrance of villages, the Internet has reached most families, and life has become more convenient. At the same time, some young people choose to work in cities, which has changed the population structure of the countryside. How to keep rural areas energetic while preserving their traditions is a question worth thinking about.',
    keys: ['take place', 'be covered by', 'population structure', 'be worth doing'],
    hard: ['“发生了巨大变化”用 Great changes have taken place；“值得思考的问题”译为 a question worth thinking about。']
  },
  {
    id: 'T15', topic: '志愿服务', zh: '志愿服务在中国发展迅速。大学生是志愿者队伍中的重要力量，他们参加支教、社区服务和大型活动的服务工作。通过志愿服务，学生不仅帮助了他人，也提高了沟通能力和责任感。许多学生表示，志愿服务的经历让他们更加了解社会。',
    en: 'Volunteer service has developed rapidly in China. College students are an important force in the volunteer team, taking part in teaching support, community service and the service work of large events. Through volunteer service, students not only help others but also improve their communication skills and sense of responsibility. Many students say that the experience has helped them understand society better.',
    keys: ['volunteer service', 'an important force', 'sense of responsibility', 'understand society better'],
    hard: ['“支教”译为 teaching support；“志愿者队伍”用 the volunteer team；“责任感”用 sense of responsibility。']
  },
  {
    id: 'T16', topic: '饮食与健康', zh: '随着生活水平的提高，人们越来越关注饮食健康。营养专家建议，多吃蔬菜水果，少吃高糖高盐的食物，并保持规律的用餐时间。然而，快节奏的生活使许多人依赖外卖，这往往导致营养不均衡。因此，学会合理安排饮食是现代人必须掌握的技能之一。',
    en: 'With the improvement of living standards, people are paying more and more attention to healthy eating. Nutrition experts suggest eating more vegetables and fruit, eating less food high in sugar and salt, and keeping regular meal times. However, the fast pace of life makes many people depend on food delivery, which often leads to an unbalanced diet. Therefore, learning to arrange meals reasonably is one of the skills that modern people must master.',
    keys: ['pay attention to', 'nutrition experts', 'depend on', 'unbalanced diet'],
    hard: ['“高糖高盐的食物”译为 food high in sugar and salt；“营养不均衡”用 an unbalanced diet；“必须掌握的技能”用 skills that must be mastered。']
  }
];
