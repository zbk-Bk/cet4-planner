/* 语法与长难句库 */
window.CET4_GRAMMAR = [
  { id: 'G01', cat: '句子结构', title: '五种基本句型：先找主干再找修饰',
    exp: '任何长句都由主谓（宾）构成。做题时先圈出谓语动词，再找主语，剩下的成分就是修饰。阅读中看不懂的句子，80% 是因为没有先抓主干。',
    ex: [['The students who study in the library every evening usually pass the exam without much difficulty.', '每天晚上在图书馆学习的学生通常能轻松通过考试。']],
    trap: '不要被 who 从句或介词短语打断，主语仍是 The students，谓语是 pass。' },
  { id: 'G02', cat: '从句', title: '定语从句：who / which / that / whose',
    exp: '定语从句修饰前面的名词。人用 who/whom，物用 which/that，所属关系用 whose。介词提前时只能用 which/whom。',
    ex: [['This is the method that helps me remember words.', '这就是帮我记单词的方法。'], ['The teacher whose class I attended last term has retired.', '上学期我听他课的那位老师已经退休了。']],
    trap: '关系代词在从句中作宾语时可省略，但作主语时不能省。' },
  { id: 'G03', cat: '从句', title: '同位语从句与定语从句的区别',
    exp: '同位语从句解释前面抽象名词的内容（fact, idea, news, belief），that 只起连接作用且不作成分；定语从句的 that 要在从句中作主语或宾语。',
    ex: [['The fact that sleep improves memory is widely accepted.', '睡眠能提高记忆这一事实被广泛接受。（同位语）'], ['The fact that he mentioned is important.', '他提到的那件事很重要。（定语）']],
    trap: '看 that 后面句子是否缺成分：不缺成分→同位语从句。' },
  { id: 'G04', cat: '从句', title: '状语从句：时间、让步、原因、条件',
    exp: '时间 when/while/as，让步 although/even if，原因 because/since/as，条件 if/unless。时间与条件状语从句中，主句用将来时，从句用一般现在时。',
    ex: [['I will tell you as soon as the result comes out.', '结果一出来我就告诉你。'], ['Unless you practise daily, listening will not improve.', '除非每天练习，听力不会提高。']],
    trap: 'although 与 but 不能连用；because 与 so 不能连用。' },
  { id: 'G05', cat: '非谓语', title: '现在分词与过去分词作状语',
    exp: '主动关系用 doing，被动关系用 done。分词作状语时，其逻辑主语必须与主句主语一致。',
    ex: [['Faced with a difficult question, she decided to move on first.', '面对一道难题，她决定先做后面的。'], ['Reading the passage twice, he found the key sentence.', '把文章读了两遍后，他找到了关键句。']],
    trap: '阅卷常见扣分点：doing/done 与主句主语不一致（悬垂修饰）。' },
  { id: 'G06', cat: '非谓语', title: '不定式作目的状语与结果状语',
    exp: 'to do 常表目的；only to do 表出乎意料的结果；so as to / in order to 也表目的，但 so as to 不放句首。',
    ex: [['He got up early to review the new words.', '他早起复习新单词。'], ['She hurried to the hall only to find it empty.', '她赶到礼堂，却发现里面空无一人。']],
    trap: '写作中表达“为了…”优先用 To..., 而不是 For...，后者在四级作文中常显得口语化。' },
  { id: 'G07', cat: '时态', title: '现在完成时 vs 一般过去时',
    exp: '有明确过去时间（yesterday, in 2020, last week）用一般过去时；强调对现在的影响或与现在相关（so far, over the past years, recently）用现在完成时。',
    ex: [['I finished the test at ten last night.', '我昨晚十点做完了测试。'], ['I have finished three tests so far.', '到目前为止我完成了三套题。']],
    trap: 'over the past ten years 必须搭配现在完成时，这是翻译高频考点。' },
  { id: 'G08', cat: '时态', title: '过去完成时：过去的过去',
    exp: '当句中出现两个过去的动作，先发生的用过去完成时。常见标志：by the time, before, when, after。',
    ex: [['By the time I arrived, the lecture had already begun.', '我到的时候，讲座已经开始了。']],
    trap: '仅有一个过去动作时不要用过去完成时。' },
  { id: 'G09', cat: '被动语态', title: '被动语态的时态变化',
    exp: 'be + 过去分词，时态体现在 be 上。翻译中的“被广泛认为”“已被建成”“可以追溯到”都是被动语态高频表达。',
    ex: [['It is widely believed that reading broadens the mind.', '人们普遍认为阅读开阔思维。'], ['The bridge was completed in 2010.', '这座桥于 2010 年建成。']],
    trap: 'happen, appear, last, belong 等不及物动词没有被动语态。' },
  { id: 'G10', cat: '虚拟语气', title: 'if 虚拟条件句的三种时间',
    exp: '与现在相反：if + 过去式，would do；与过去相反：if + had done，would have done；与将来相反：if + were to do，would do。',
    ex: [['If I had started earlier, I would have finished the plan.', '如果我早点开始，就已经完成计划了。'], ['If I were you, I would keep a mistake notebook.', '如果我是你，我会准备一个错题本。']],
    trap: '写作中 used to / would 与虚拟语气不要混用。' },
  { id: 'G11', cat: '特殊结构', title: '倒装句：否定词与 only 置句首',
    exp: '否定词（never, hardly, seldom, not until）或 Only + 状语置句首时，主句部分倒装，把助动词提到主语前。',
    ex: [['Only in this way can we improve our listening.', '只有这样我们才能提高听力。'], ['Never have I seen such a clear explanation.', '我从未见过如此清晰的解释。']],
    trap: 'Only 修饰主语时不倒装：Only he knows the answer.' },
  { id: 'G12', cat: '特殊结构', title: '强调句 It is ... that ...',
    exp: '强调句可强调主语、宾语和状语，去掉 It is 和 that 后句子依然完整。',
    ex: [['It is daily practice that makes the difference.', '正是每天练习带来了差别。']],
    trap: '注意与 It is ... that 形式主语的区别：形式主语后面句子不完整。' },
  { id: 'G13', cat: '名词与冠词', title: '可数名词复数与不可数名词',
    exp: 'information, advice, equipment, furniture, progress, knowledge 均为不可数名词，不能加 s，也不能用 a/an。',
    ex: [['The teacher gave me some useful advice.', '老师给了我一些有用的建议。']],
    trap: '写作中 a lot of informations / an advice 是典型扣分错误。' },
  { id: 'G14', cat: '介词与搭配', title: '高频动词搭配',
    exp: 'be good at / be interested in / depend on / be responsible for / consist of / succeed in / prevent ... from ...。搭配错误比语法错误更常见。',
    ex: [['Success depends on daily effort rather than on luck.', '成功取决于每天的努力，而不是运气。']],
    trap: '记住搭配要背“动词 + 介词 + 名词”整体，而不是单独背动词。' },
  { id: 'G15', cat: '比较结构', title: '比较级与倍数表达',
    exp: '“A 是 B 的三倍”可用 A is three times as large as B / A is three times the size of B；the more ..., the more ... 表示“越…越…”。',
    ex: [['The earlier you start, the easier the exam becomes.', '开始得越早，考试越轻松。']],
    trap: '不能写成 more easier；比较对象要一致。' },
  { id: 'G16', cat: '连接词', title: '写作必备连接词分组',
    exp: '递进：moreover, what is more；转折：however, nevertheless；因果：therefore, as a result；举例：for instance, take ... as an example；总结：in short, to sum up。',
    ex: [['What is more, regular review keeps memory fresh.', '此外，规律复习能保持记忆清晰。']],
    trap: '同一篇作文里不要连续使用相同的连接词，尤其避免每段都用 In addition。' },
  { id: 'G17', cat: '长难句', title: '长难句三步拆解法',
    exp: '第一步找谓语，划分句子有几个分句；第二步找连词，确定从句类型；第三步把从句括起来，只看主干。熟练后每句话只需 10 秒。',
    ex: [['What matters is not how many words you know but how well you can use them.', '重要的不是你会多少单词，而是你能用得多好。']],
    trap: '阅读中切忌逐词翻译成中文；先把结构看清，再处理生词。' },
  { id: 'G18', cat: '标点与格式', title: '写作格式与标点细节',
    exp: '英文逗号不能连接两个完整句子（逗号粘连）；句号后空一格；不要用中文标点；段首不空两格，段间空一行。',
    ex: [['Practice is hard, but it works.', '练习很难，但有效。（正确）']],
    trap: 'Practice is hard, it works.（错误：逗号粘连）应改为分号或加连词。' }
];

/* 各题型解题技巧与考试策略 */
window.CET4_SKILLS = [
  { id: 'S01', module: 'listening', title: '听力总原则：预读、猜测、不回头', points: [
    '播放指令的 30 秒一定要用来预读选项，圈出每个选项的关键词。',
    '听录音时眼睛看选项、耳朵听关键词，不要试图听懂每个词。',
    '漏掉一题立刻放弃，把注意力交给下一题；回头想会连丢三题。',
    '新闻题答案常在首句；长对话答案常出现在提问之后；篇章题答案按顺序出现。'
  ]},
  { id: 'S02', module: 'listening', title: '短篇新闻：抓首句与数字', points: [
    '新闻首句通常交代“谁、在哪里、发生了什么”，第一题答案多在此。',
    '数字题要区分：价格、时间、人数、百分比；注意 rather than / instead of 的修正。',
    '转折词 but, however, though 后常出现真实情况或问题。'
  ]},
  { id: 'S03', module: 'listening', title: '长对话：人物关系与建议', points: [
    '先判断场景：图书馆、租房、求职、选课、机场；场景决定词汇范围。',
    '问题常问 What / Why / What does the man suggest，答案常在第二人说话处。',
    '注意语气词 Well, Actually, Hmm，其后常是真实想法。'
  ]},
  { id: 'S04', module: 'listening', title: '听力篇章：顺序原则与主旨题', points: [
    '10 道题基本按文章顺序出现，边听边定位。',
    '主旨题问 mainly about / main idea，答案是覆盖面最广而非最具体的选项。',
    '举例处（for example）、数字处、结论处（so, therefore, in short）是高频出题点。'
  ]},
  { id: 'S05', module: 'listening', title: '精听与听写训练法', points: [
    '第一遍盲听抓大意；第二遍逐句暂停，写下听到的内容；第三遍对照原文标出漏听点。',
    '漏听原因分为三类：连读、生词、语速；三类问题用三种方法解决。',
    '把一句听不懂的话重复 5 遍以上，比听 5 篇新材料更有效。'
  ]},
  { id: 'S06', module: 'reading', title: '阅读三题型时间分配', points: [
    '总时间 40 分钟：选词填空 8 分钟，长篇阅读匹配 12 分钟，仔细阅读 18 分钟，检查 2 分钟。',
    '分值：仔细阅读每题 14.2 分，匹配每题 7.1 分，选词填空每题 3.55 分。先做高分题型。',
    '遇到卡住的题先标记，做完高分题再回来。'
  ]},
  { id: 'S07', module: 'reading', title: '选词填空：先分词性再填空', points: [
    '先给 15 个选项按词性分组：名词、动词、形容词、副词。',
    '读句子判断空格成分，再看单复数、时态、搭配是否匹配。',
    '不确定时优先看固定搭配，如 take ... into account。'
  ]},
  { id: 'S08', module: 'reading', title: '长篇阅读匹配：先题干后定位', points: [
    '先读 10 个句子，圈出专有名词、数字、特殊动词，再回文定位。',
    '一段可能对应两题，也可能不对应任何题，不要按顺序硬找。',
    '题干常用同义替换，答案往往不是原词复现。'
  ]},
  { id: 'S09', module: 'reading', title: '仔细阅读：定位句决定答案', points: [
    '顺序原则：题目顺序与文章顺序一致，第 3 题答案在第 2 题答案之后。',
    '每题都能在原文找到定位句，先找句再选答案，不要凭印象。',
    '干扰项特征：偷换主体、扩大范围、绝对化（all, never）、原文未提及。',
    '态度题注意 weak/general/sympathetic 等词，选项中出现 only, always 要谨慎。'
  ]},
  { id: 'S10', module: 'reading', title: '限时训练与错题复盘', points: [
    '每篇仔细阅读限时 9 分钟，超时就停笔，训练考试节奏。',
    '复盘要比做题花更多时间：逐题写出定位句和干扰项排除理由。',
    '整理错题类型：定位失败、词义误解、逻辑推断错误、时间不足。'
  ]},
  { id: 'S11', module: 'writing', title: '作文 30 分钟时间表', points: [
    '0-3 分钟审题列提纲；3-22 分钟写作；22-27 分钟检查；27-30 分钟抄清。',
    '检查重点：主谓一致、时态、单复数、拼写、标点，每次只检查一项。',
    '字数 120-180 词为佳，三段或四段，每段一个中心。'
  ]},
  { id: 'S12', module: 'writing', title: '三段式万能结构', points: [
    '首段：背景句 + 争议/现象 + 中心句（明确表态）。',
    '中间段：观点 + 原因 + 例子 + 小结，用 First, What is more, For example 衔接。',
    '末段：重申观点 + 建议/展望，用 To sum up, In my view, Therefore。',
    '不要用 I think 开头反复出现，改用 In my view, As far as I am concerned。'
  ]},
  { id: 'S13', module: 'writing', title: '高分句型 8 个（背熟可直接套用）', points: [
    'It is widely accepted that ...',
    'There is no denying that ...',
    'What matters most is not ... but ...',
    'The reason why ... is that ...',
    'Take ... as an example, ...',
    'Compared with ..., ... has more advantages in ...',
    'Only by doing so can we ...',
    'It is high time that we took action to ...'
  ]},
  { id: 'S14', module: 'writing', title: '作文评分四要点', points: [
    '内容切题：每段都服务于题目，不写与主题无关的段落。',
    '结构清楚：有明确的段落和连接词，阅卷老师 30 秒内能看到框架。',
    '语言准确：宁可用简单但正确的句子，也不用复杂但错误的句子。',
    '词汇多样：同一意思至少准备两种表达，如 important / vital / crucial。'
  ]},
  { id: 'S15', module: 'translation', title: '汉译英四步法', points: [
    '第一步：通读全段，确定时态与人称（说明文化多用一般现在时，介绍变化用现在完成时）。',
    '第二步：逐句找主干，先写“主谓宾”，再补修饰成分。',
    '第三步：处理文化词与难词，用解释性表达（如“月饼 mooncake”“养生 health preservation”）。',
    '第四步：检查时态、单复数、冠词、介词、拼写。'
  ]},
  { id: 'S16', module: 'translation', title: '翻译常见难点处理', points: [
    '无主句：补充泛指主语，如“人们普遍认为”译为 It is widely believed that。',
    '长定语：拆成从句或后置短语，“位于长江下游的城市”译为 a city located in the lower reaches of the Yangtze River。',
    '并列动词：用 not only ... but also 或分词结构连接，避免连续 and。',
    '数字与年代：2008 年译为 in 2008；二十世纪八十年代译为 in the 1980s。'
  ]},
  { id: 'S17', module: 'translation', title: '中国文化热点词（必背）', points: [
    '传统文化：traditional culture, cultural heritage 文化遗产, intangible cultural heritage 非物质文化遗产',
    '节日：the Spring Festival, the Lantern Festival, the Dragon Boat Festival 端午节, the Mid-Autumn Festival',
    '艺术：calligraphy 书法, Chinese painting, Peking opera, paper cutting 剪纸',
    '思想：Confucius 孔子, Confucianism 儒家思想, harmony 和谐, filial piety 孝',
    '发展：reform and opening-up 改革开放, sustainable development, poverty relief 扶贫'
  ]},
  { id: 'S18', module: 'vocab', title: '单词记忆四步法', points: [
    '第一步：读音先行，用 TTS 或词典音频听 3 遍，会读才记得住。',
    '第二步：看例句，不要只背中文释义；在句子中理解词义与搭配。',
    '第三步：当天、第 2 天、第 4 天、第 7 天各复习一次。',
    '第四步：用“遮挡法”自测，能说出中文并用它造一句话才算掌握。'
  ]},
  { id: 'S19', module: 'vocab', title: '避免背词三大误区', points: [
    '只背单词表不读例句：结果是认识但不会用，阅读时仍然看不懂句子。',
    '只追求数量：一天背 200 个新词，第二天忘记 180 个。',
    '忽略熟词僻义：like（像）、figure（认为/数字）、charge（收费）在四级中常考非第一义项。'
  ]},
  { id: 'S20', module: 'exam', title: '考试当天流程与注意事项', points: [
    '先写作文（30 分钟），再听力（25 分钟），听力结束后立即收作文与听力答题卡。',
    '听力必须边听边涂卡，没有额外涂卡时间。',
    '阅读与翻译共 70 分钟，建议阅读 40 分钟、翻译 30 分钟，翻译不要留到最后 10 分钟。',
    '带齐证件、2B 铅笔、黑色签字笔、耳机（电池），提前 30 分钟到考场。'
  ]},
  { id: 'S21', module: 'exam', title: '最后两周的复习策略', points: [
    '完整模考 3-4 次，每次严格按考试时间，包括作文与翻译。',
    '停止背新词，只复习错题本与高频词表。',
    '把听力最常错的题型重听一遍，写作背熟 3 个模板与 8 个句型。',
    '保证睡眠，考前不要熬夜刷题。'
  ]}
];

/* 四级试卷结构与评分 */
window.CET4_EXAM = {
  total: 710, pass: 425,
  sections: [
    { name: '写作', en: 'Writing', ratio: '15%', score: 106.5, time: 30, desc: '短文写作 120-180 词，1 题' },
    { name: '听力', en: 'Listening', ratio: '35%', score: 248.5, time: 25, desc: '短篇新闻 3 篇（7 题）+ 长对话 2 篇（8 题）+ 听力篇章 3 篇（10 题）' },
    { name: '阅读', en: 'Reading', ratio: '35%', score: 248.5, time: 40, desc: '选词填空 10 题 + 长篇阅读匹配 10 题 + 仔细阅读 10 题' },
    { name: '翻译', en: 'Translation', ratio: '15%', score: 106.5, time: 30, desc: '汉译英段落翻译，140-180 词，1 题' }
  ],
  readingDetail: [
    { name: '选词填空', score: 35.5, per: 3.55, count: 10, advice: '每题 3.55 分，性价比最低，建议最后做或只做有把握的题。' },
    { name: '长篇阅读匹配', score: 71, per: 7.1, count: 10, advice: '每题 7.1 分，先题干后定位，不要求全对，争取 7 题以上。' },
    { name: '仔细阅读', score: 142, per: 14.2, count: 10, advice: '每题 14.2 分，最高分值，必须优先保证正确率。' }
  ],
  writingScale: [
    ['14 分（满分 15 分档）', '内容切题、结构清晰、语言基本无错误，词汇与句式有变化'],
    ['11-13 分', '内容较切题、结构完整，有少量语法或拼写错误但不影响理解'],
    ['8-10 分', '基本切题，句子结构简单或错误较多，部分表达影响理解'],
    ['5-7 分', '条理不清，错误较多，仅有部分内容与题目相关'],
    ['2-4 分', '严重偏题或错误频繁，难以理解'],
    ['0-1 分', '只有零散词汇，或几乎未作答']
  ],
  translationScale: [
    ['14 分档', '译文准确完整，用词恰当，几乎无语法错误'],
    ['11-13 分', '译文基本准确，个别词句处理不当，少数错误'],
    ['8-10 分', '大意基本译出，有较多语法或用词错误，部分句子不通顺'],
    ['5-7 分', '仅译出部分内容，错误较多'],
    ['2-4 分', '只译出个别单词或短语'],
    ['0-1 分', '未作答或无法辨认']
  ],
  listeningSceneWords: [
    ['校园学习', 'assignment, deadline, term paper, lecture, seminar, credit, tuition, scholarship, registration, transcript'],
    ['图书馆', 'renew, due date, overdue, reserve, catalogue, reference book, photocopy, journal'],
    ['求职面试', 'resume, interview, applicant, qualification, experience, salary, benefit, promotion, full-time, part-time'],
    ['租房生活', 'rent, deposit, landlord, tenant, furnished, utilities, lease, roommate, suburb'],
    ['交通出行', 'delay, platform, transfer, fare, round trip, one-way, departure, boarding, timetable'],
    ['餐厅购物', 'menu, order, bill, tip, receipt, refund, discount, on sale, out of stock'],
    ['医疗健康', 'symptom, prescription, appointment, clinic, injection, allergy, insurance'],
    ['时间数字', 'a quarter past, half past, decade, percent, dozen, double, triple, approximately']
  ],
  writingConnectors: {
    '递进': ['moreover', 'what is more', 'in addition', 'furthermore'],
    '转折': ['however', 'nevertheless', 'on the contrary', 'whereas'],
    '因果': ['therefore', 'as a result', 'consequently', 'owing to'],
    '举例': ['for instance', 'take ... as an example', 'such as', 'a case in point'],
    '总结': ['in short', 'to sum up', 'in conclusion', 'all in all']
  },
  commonMistakes: [
    '主谓一致：The number of students is increasing.（the number 视为单数）',
    '时态混用：介绍文化用一般现在时，不要中途换成过去时。',
    '可数不可数：information, advice, equipment, furniture, progress, knowledge 不加 s。',
    '介词搭配：depend on, be responsible for, prevent ... from。',
    '逗号粘连：两个完整句子不能只用逗号连接。',
    '中文标点：作文与翻译中所有标点必须用英文标点。',
    '冠词遗漏：a/an 与 the 的使用错误在翻译中扣分明显。',
    '拼写错误：government, environment, necessary, receive, believe, foreign。'
  ]
};
