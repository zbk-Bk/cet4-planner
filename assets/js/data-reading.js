/* 听力材料库
   结构：{id, type: news|conversation|passage, title, script, zh, words:[[词,义]], qs:[[题干,[A,B,C,D],答案下标,解析]]}
   说明：网页内置语音朗读（TTS）可调速播放，支持逐句精听与听写。 */
window.CET4_LISTENING = [
  {
    id: 'L01', type: 'news', title: 'Campus Bike Sharing Grows',
    script: `A new bike-sharing program has been introduced on several university campuses this term. More than two thousand bicycles are now available to students at a cost of one yuan per hour. The university says the program aims to reduce traffic around dormitories and classrooms. Students simply scan a code on the bike to unlock it, and they can leave it at any marked area on campus. Early users say the service saves them about fifteen minutes on the way to morning classes. However, the manager admits that broken bikes and random parking remain a problem, and a team of ten workers is collecting and repairing them every day.`,
    zh: `本学期，多所大学校园推出了新的共享单车项目。目前有两千多辆自行车可供学生使用，每小时一元。校方表示，该项目旨在减少宿舍和教学楼周边的交通拥堵。学生只需扫码解锁，并可将车停放在校园内任何指定区域。早期使用者说，这项服务让他们去上早课的路上节省约十五分钟。不过，管理者承认车辆损坏和乱停放仍是问题，一支十人的队伍每天在收集和维修车辆。`,
    words: [['available', '可使用的'], ['unlock', '解锁'], ['random', '随意的'], ['admit', '承认'], ['remain', '仍然是']],
    qs: [
      ['What is the purpose of the bike-sharing program?', ['To earn money for the university.', 'To reduce traffic around buildings.', 'To replace campus buses.', 'To encourage students to travel far.'], 1, '新闻第二句明确指出 aims to reduce traffic around dormitories and classrooms。'],
      ['How much does a student pay per hour?', ['One yuan.', 'Two yuan.', 'Ten yuan.', 'It is free.'], 0, 'at a cost of one yuan per hour 直接给出价格。'],
      ['What problem remains unsolved?', ['Too few users.', 'High rent.', 'Broken bikes and random parking.', 'Slow mobile signals.'], 2, '转折词 However 后即为答案：broken bikes and random parking remain a problem。']
    ]
  },
  {
    id: 'L02', type: 'news', title: 'Sleep Study Among Freshmen',
    script: `A survey of three thousand first-year students has found that nearly forty percent sleep less than six hours a night. Researchers at a medical school collected the data over one term and linked short sleep with lower grades and higher stress. The study also found that students who used their phones in bed went to sleep about fifty minutes later than those who did not. Doctors suggest keeping a fixed bedtime and putting the phone outside the bedroom. The research team says the simplest change often brings the biggest result, and it plans to repeat the survey next year.`,
    zh: `一项针对三千名大一学生的调查发现，近四成学生每晚睡眠不足六小时。某医学院的研究人员在一个学期内收集了这些数据，并将睡眠不足与更低的成绩和更高的压力联系起来。研究还发现，在床上使用手机的学生比不使用的学生入睡时间约晚五十分钟。医生建议保持固定的就寝时间，并把手机放在卧室外。研究团队表示，最简单的改变往往带来最大的效果，并计划明年重复这项调查。`,
    words: [['survey', '调查'], ['link...with', '把…与…联系起来'], ['fixed', '固定的'], ['bedtime', '就寝时间'], ['repeat', '重复']],
    qs: [
      ['What percentage of students sleep less than six hours?', ['About 14%.', 'About 30%.', 'Nearly 40%.', 'Over 50%.'], 2, 'nearly forty percent 与选项 C 一致。'],
      ['What habit was connected with later bedtime?', ['Watching TV.', 'Reading in bed.', 'Using phones in bed.', 'Drinking coffee.'], 2, 'phones in bed 使入睡晚约 50 分钟。'],
      ['What do doctors suggest?', ['Sleeping in the afternoon.', 'Keeping a fixed bedtime.', 'Studying at night.', 'Taking sleeping pills.'], 1, '医生建议保持固定就寝时间并把手机放在卧室外。']
    ]
  },
  {
    id: 'L03', type: 'news', title: 'Library Extends Opening Hours',
    script: `The main library will stay open until midnight from next Monday, two hours later than before. The decision follows complaints from students who said they had nowhere quiet to study before exams. Only the second and third floors will remain open late, and a student card is required after ten o'clock. The library will also add two hundred seats and a small coffee corner. Staff say security guards will check the reading rooms every hour, and anyone who leaves belongings on a desk for more than two hours may lose the seat.`,
    zh: `主图书馆将从下周一起开放至午夜，比之前延长两小时。这一决定是回应学生的抱怨——他们说考试前找不到安静的学习场所。只有二、三层会在晚间继续开放，十点后需持学生卡。图书馆还将增加两百个座位和一个小咖啡角。工作人员说，保安每小时巡查阅览室，任何把物品留在桌上超过两小时的人可能失去座位。`,
    words: [['extend', '延长'], ['complaint', '抱怨'], ['belongings', '财物'], ['security guard', '保安']],
    qs: [
      ['How much longer will the library stay open?', ['One hour.', 'Two hours.', 'Three hours.', 'Four hours.'], 1, 'two hours later than before 即延长两小时。'],
      ['What is required after 10 p.m.?', ['A ticket.', 'A student card.', 'A password.', 'A printed form.'], 1, 'a student card is required after ten in the evening。'],
      ['What may cost a student his seat?', ['Talking loudly.', 'Eating snacks.', 'Leaving belongings over two hours.', 'Reading too many books.'], 2, '留下物品超过两小时可能失去座位。']
    ]
  },
  {
    id: 'L04', type: 'news', title: 'Volunteers Teach Online English',
    script: `A group of retired teachers has started a free online English program for students in small towns. The program began with twelve volunteers and now has more than eighty. Classes are held twice a week in the evening and last forty minutes. Teachers say the biggest challenge is not grammar but confidence, because many students are afraid of making mistakes in front of others. To solve the problem, each class begins with a five-minute chat about daily life. So far, more than six thousand students have joined, and the program is looking for more volunteers this winter.`,
    zh: `一群退休教师为小城镇的学生开设了免费在线英语课程。该项目从十二名志愿者开始，现在已有八十多名。课程每周两次，在晚间进行，每次四十分钟。老师们说最大的挑战不是语法而是自信，因为许多学生害怕在他人面前出错。为解决这个问题，每节课以一个五分钟的日常生活聊天开始。目前已有六千多名学生加入，该项目今年冬天正在招募更多志愿者。`,
    words: [['retired', '退休的'], ['volunteer', '志愿者'], ['confidence', '自信'], ['challenge', '挑战']],
    qs: [
      ['How often are the classes held?', ['Once a week.', 'Twice a week.', 'Every day.', 'Twice a month.'], 1, 'Classes are held twice a week。'],
      ['What is the biggest challenge according to teachers?', ['Grammar rules.', 'Limited time.', 'Students confidence.', 'Poor equipment.'], 2, '原文强调 not grammar but confidence。'],
      ['How does each class begin?', ['With a test.', 'With a five-minute chat.', 'With a song.', 'With homework checking.'], 1, 'each class begins with a five-minute chat。']
    ]
  },
  {
    id: 'L05', type: 'conversation', title: 'Booking a Study Room',
    script: `M: Hi, I'd like to book a group study room for Thursday evening. Do you have anything free between seven and nine?
W: Let me check. Rooms A and C are taken, but Room B is still open from seven to nine thirty.
M: That works. We are a group of six. Is there a limit on the number of people?
W: Rooms can hold up to eight, but you need at least four people to book one.
M: Good. Do we need to bring our own whiteboard markers?
W: We provide markers and a screen, but you must bring your own laptop if you need one. Also, please arrive within fifteen minutes of the booking time, or the room will be given to others.
M: Understood. I'll be there at ten to seven.`,
    zh: `男：你好，我想预订周四晚上的小组研讨室。七点到九点间有空位吗？
女：我查一下。A 房和 C 房已被预订，但 B 房七点到九点半还空着。
男：可以。我们一共六个人。有使用人数限制吗？
女：房间最多容纳八人，但预订至少需要四人。
男：好。我们需要自己带白板笔吗？
女：我们提供白板笔和投影幕，但如果你需要电脑必须自备。另外，请在预订时间后十五分钟内到达，否则房间将给别人。
男：明白了，我六点五十到。`,
    words: [['book', '预订'], ['hold up to', '可容纳'], ['marker', '白板笔'], ['within', '在…之内']],
    qs: [
      ['Which room is available on Thursday evening?', ['Room A.', 'Room B.', 'Room C.', 'None of them.'], 1, 'Room B is still open from seven to nine thirty。'],
      ['What is the minimum number of people for a booking?', ['Two.', 'Four.', 'Six.', 'Eight.'], 1, 'you need at least four people to book one。'],
      ['What must the man bring himself?', ['A whiteboard marker.', 'A screen.', 'A laptop.', 'A key.'], 2, 'must bring your own laptop。'],
      ['What happens if he arrives too late?', ['He pays a fine.', 'The room goes to others.', 'He changes rooms.', 'He waits outside.'], 1, '超过十五分钟房间将给别人。']
    ]
  },
  {
    id: 'L06', type: 'conversation', title: 'Talking About a Part-time Job',
    script: `W: You look tired, Tom. Are you still working at the coffee shop?
M: I quit last week. The night shifts were killing me, and I had three morning classes.
W: So how are you paying for your books this term?
M: I found a job at the campus library. It pays less, but I only work twelve hours a week and I can study when it is quiet.
W: That sounds much better. Are they still hiring?
M: Actually, they need one more person for weekend afternoons. You should ask for Mrs. Lin at the front desk.
W: I will. I could really use the extra money.`,
    zh: `女：你看起来很累，汤姆。你还在咖啡店上班吗？
男：我上周辞职了。夜班让我受不了，而且我还有三门早课。
女：那你这个学期的书费怎么办？
男：我在校园图书馆找了份工作。工资低一点，但每周只工作十二小时，而且安静的时候我能学习。
女：听起来好多了。他们还在招人吗？
男：其实他们还需要一个人做周末下午。你该去前台找林老师。
女：我会去的。我确实需要这笔额外的钱。`,
    words: [['quit', '辞职'], ['shift', '班次'], ['hiring', '正在招聘'], ['extra', '额外的']],
    qs: [
      ['Why did the man leave the coffee shop?', ['The pay was low.', 'The night shifts were too hard.', 'He was fired.', 'The shop closed.'], 1, 'The night shifts were killing me 说明夜班太辛苦。'],
      ['What is good about the library job?', ['It pays more.', 'It is close to home.', 'He can study at work.', 'It offers free coffee.'], 2, '安静时可以在工作中学习。'],
      ['What does the man suggest the woman do?', ['Work at the coffee shop.', 'Apply for a weekend job.', 'Take fewer classes.', 'Borrow his books.'], 1, '他建议她去前台找 Mrs. Lin 申请周末下午的岗位。']
    ]
  },
  {
    id: 'L07', type: 'conversation', title: 'Asking About an Exchange Program',
    script: `M: Excuse me, I am interested in the exchange program to Canada. What are the requirements?
W: You need a score of at least 425 on the CET-4 and a grade point average above three.
M: My CET-4 score is 480, but my average is 2.9. Is there anything I can do?
W: You can apply anyway if a professor writes a recommendation letter for you. The deadline is November the tenth.
M: And what about the cost? I heard it is expensive.
W: Tuition is paid to our university, but you cover your own flight and living costs. There are also five scholarships of ten thousand yuan each.
M: That sounds worth trying. Thank you.`,
    zh: `男：打扰一下，我对去加拿大的交换项目很感兴趣。有什么要求？
女：你需要四级至少 425 分，平均绩点在 3 以上。
男：我四级 480 分，但平均绩点只有 2.9。有什么办法吗？
女：如果有教授为你写推荐信，你还是可以申请。截止日期是十一月十日。
男：费用方面呢？我听说很贵。
女：学费交给我们学校，但你要自己承担机票和生活费。另外还有五个各一万元的奖学金。
男：那值得一试。谢谢。`,
    words: [['exchange program', '交换项目'], ['requirement', '要求'], ['recommendation letter', '推荐信'], ['tuition', '学费']],
    qs: [
      ['What is the minimum CET-4 score for the program?', ['400.', '425.', '480.', '500.'], 1, 'a score of at least 425。'],
      ['How can the man make up for his low average?', ['By taking a test.', 'By paying extra.', 'With a recommendation letter.', 'By waiting a year.'], 2, '教授推荐信可以弥补绩点不足。'],
      ['Which cost does the student pay himself?', ['Tuition.', 'Application fee.', 'Flight and living costs.', 'Nothing.'], 2, '机票和生活费由学生自己承担。']
    ]
  },
  {
    id: 'L08', type: 'conversation', title: 'Planning a Group Presentation',
    script: `W: We have to finish the presentation by Friday. Have you collected the data yet?
M: I have, but the numbers from the two cities are not comparable. One group used a different method.
W: Then let us focus on the city with complete data and mention the other as a limitation.
M: Good idea. I will prepare the slides tonight. Can you write the opening part?
W: Sure, but I need the data by Thursday morning. I present better when I have time to practise.
M: No problem. Let us meet at four on Thursday in the small room to run through it once.
W: Make it three thirty, so we still have time to fix any problems.`,
    zh: `女：我们必须在周五前完成演示。你收集数据了吗？
男：收集了，但两个城市的数据不可比。有一组用了不同的方法。
女：那我们专注数据完整的那个城市，把另一个作为局限性提一下。
男：好主意。我今晚做幻灯片。你能写开场部分吗？
女：可以，但我周四上午前需要数据。有时间练习时我讲得更好。
男：没问题。我们周四四点在小房间碰面过一遍。
女：改到三点半吧，这样还有时间解决问题。`,
    words: [['comparable', '可比较的'], ['limitation', '局限性'], ['run through', '过一遍'], ['present', '做演示']],
    qs: [
      ['What problem did the man find in the data?', ['The data was old.', 'Two cities used different methods.', 'One file was missing.', 'The numbers were too large.'], 1, 'not comparable 因为方法不同。'],
      ['What will the woman do?', ['Make the slides.', 'Write the opening.', 'Collect new data.', 'Book the room.'], 1, '她负责写开场部分。'],
      ['When will they meet?', ['Three thirty Thursday.', 'Four Thursday.', 'Ten Thursday.', 'Friday morning.'], 0, '女方把时间从四点改到三点半。']
    ]
  },
  {
    id: 'L09', type: 'passage', title: 'The Value of Mistakes',
    script: `Many students treat mistakes as evidence of failure, but research suggests that errors are actually the most useful part of learning. When you make a mistake and notice it yourself, your brain pays close attention to the difference between what you expected and what happened. This is why keeping a mistake notebook works so well. Instead of copying the correct answer only, write down how you thought about the question and where your reasoning went wrong. Students who review their own mistakes often improve twice as fast as those who simply do more exercises. So next time you find an error, do not hide it. Study it.`,
    zh: `许多学生把错误当作失败的证据，但研究表明，错误实际上是学习中最有用的部分。当你犯错并且自己发现它时，你的大脑会密切关注你期望的与发生的结果之间的差异。这就是为什么记错题本效果很好。不要只抄正确答案，而要写下你对这道题的思考过程，以及推理在哪里出了错。回顾自己错误的学生往往比单纯做更多题的学生进步快一倍。所以下次发现错误时，不要隐藏它，研究它。`,
    words: [['evidence', '证据'], ['pay close attention to', '密切关注'], ['reasoning', '推理'], ['twice as fast', '快一倍']],
    qs: [
      ['What do many students think of mistakes?', ['They are useful.', 'They prove failure.', 'They are rare.', 'They are easy to fix.'], 1, 'treat mistakes as evidence of failure。'],
      ['What should you write in a mistake notebook besides the answer?', ['The date.', 'Your thinking process.', 'The page number.', 'The teacher name.'], 1, '写下思考过程和出错环节。'],
      ['How much faster do students who review mistakes improve?', ['Slightly faster.', 'Twice as fast.', 'Three times as fast.', 'No difference.'], 1, 'improve twice as fast。']
    ]
  },
  {
    id: 'L10', type: 'passage', title: 'Learning by Teaching',
    script: `Researchers have long noticed that students understand material better when they explain it to someone else, a phenomenon often called the teaching effect. In one experiment, half of the students studied a text for a test, while the other half studied the same text in order to teach it to a partner. The second group spent more time on the key ideas and organised them more clearly, and in the final test they scored about twenty percent higher. The lesson is simple. If you want to remember what you read, close the book and explain it out loud in your own words, as if a friend were sitting next to you.`,
    zh: `研究者早就注意到，当学生把材料解释给别人听时，理解会更好，这一现象常被称为教学效应。在一项实验中，一半学生为考试而学习一篇文章，另一半学生为教给同伴而学习同样的文章。第二组在关键观点上花的时间更多，组织得更清楚，在最后的测试中得分约高百分之二十。教训很简单：如果你想记住读过的内容，就合上书，用自己的话大声解释，好像有朋友坐在你旁边一样。`,
    words: [['phenomenon', '现象'], ['organise', '组织'], ['out loud', '大声地'], ['as if', '好像']],
    qs: [
      ['What is the teaching effect?', ['Teaching is harder than learning.', 'Explaining improves understanding.', 'Teachers learn slowly.', 'Partners help with homework.'], 1, '把材料解释给别人听时理解更好。'],
      ['How much higher did the second group score?', ['About 2%.', 'About 12%.', 'About 20%.', 'About 50%.'], 2, 'scored about twenty percent higher。'],
      ['What does the speaker suggest at the end?', ['Reading twice.', 'Writing more notes.', 'Explaining aloud in your own words.', 'Testing a friend.'], 2, '合上书，用自己的话大声解释。']
    ]
  },
  {
    id: 'L11', type: 'passage', title: 'City Cycling Plan',
    script: `The city council has announced a plan to build thirty kilometres of protected bicycle lanes over the next two years. The lanes will connect nine subway stations with the busiest office areas. Officials say the aim is to cut the number of short car trips, which now make up almost a third of all morning traffic. Shops along two main streets have complained that they will lose parking spaces for customers. The council has promised to add short-term parking in side streets and to keep the project under review. Work on the first section begins in March, and cyclists can expect to use it before summer.`,
    zh: `市议会宣布计划在未来两年内修建三十公里的受保护自行车道。这些车道将把九个地铁站与最繁忙的办公区域连接起来。官员称目标是减少短途汽车出行，目前短途出行占早高峰交通的近三分之一。两条主要街道沿线的商铺抱怨会失去顾客停车位。议会承诺在小街增设短时停车位，并持续审查该项目。第一段工程三月开工，骑行者可在夏季前使用。`,
    words: [['council', '议会'], ['lane', '车道'], ['cut', '削减'], ['complain', '抱怨'], ['under review', '接受审查']],
    qs: [
      ['How long will the new bike lanes be?', ['13 kilometres.', '30 kilometres.', '90 kilometres.', 'Two kilometres.'], 1, 'thirty kilometres。'],
      ['What is the goal of the project?', ['To cut short car trips.', 'To attract tourists.', 'To sell bicycles.', 'To widen roads.'], 0, '减少短途汽车出行。'],
      ['Why did some shops complain?', ['Noise at night.', 'Lost parking spaces.', 'Higher rents.', 'Fewer deliveries.'], 1, '会失去顾客停车位。']
    ]
  },
  {
    id: 'L12', type: 'passage', title: 'Food Waste on Campus',
    script: `A student team spent one month weighing the food thrown away in three campus dining halls. They found that about one hundred and twenty kilograms of food was wasted every day, and most of it had never been eaten. The main reasons were large fixed portions and the habit of taking more dishes than students could finish. In a follow-up trial, one dining hall offered two sizes of rice and put up a sign asking diners to take less and return for more. The waste in that hall dropped by nearly forty percent within a week. The team now hopes to spread the method to all dining halls on campus.`,
    zh: `一个学生团队用一个月时间称量了三个校园食堂被丢弃的食物。他们发现每天大约有一百二十公斤食物被浪费，其中大部分从未被吃过。主要原因是固定的分量偏大，以及学生拿的菜超过自己能吃完的量。在随后的一次试验中，一个食堂提供两种分量的米饭，并贴出告示请就餐者少取一些、不够再来。该食堂的浪费在一周内下降了近四成。团队现在希望把这一方法推广到全校所有食堂。`,
    words: [['weigh', '称重'], ['portion', '分量'], ['trial', '试验'], ['spread', '推广']],
    qs: [
      ['How much food was wasted every day?', ['About 12 kilograms.', 'About 100 kilograms.', 'About 120 kilograms.', 'About 400 kilograms.'], 2, 'one hundred and twenty kilograms。'],
      ['What was one main reason for the waste?', ['Bad cooking.', 'Fixed portions too large.', 'No tables.', 'Short lunch time.'], 1, '分量偏大是主因之一。'],
      ['How much did the waste drop in the trial hall?', ['Nearly 4%.', 'Nearly 14%.', 'Nearly 40%.', 'Nearly 80%.'], 2, 'dropped by nearly forty percent。']
    ]
  }
];

/* 阅读材料库
   结构：{id, kind: careful|matching|cloze, title, topic, passage, words:[[词,义]], qs:[[题干,[A,B,C,D],答案,解析]]} */
window.CET4_READING = [
  {
    id: 'R01', kind: 'careful', title: 'Why Reading Still Matters', topic: '教育',
    passage: `Reading long texts is often described as an old-fashioned skill in the age of short videos. The evidence, however, points the other way. Studies of university students show that those who read continuously for thirty minutes or more have better attention control than those who read only in short bursts. More importantly, long reading trains readers to hold several ideas at once and to notice how an argument develops, which is exactly what the reading section of the CET-4 tests.

Screens are not the enemy. The real problem is interruption. When readers stop every two minutes to check messages, they lose the thread of the text and must start again, and each restart costs time and energy. Researchers call this a "switching cost".

The good news is that this skill can be rebuilt fairly quickly. In one experiment, students who practised twenty minutes of uninterrupted reading a day for three weeks improved their reading speed by fifteen percent. The advice from the researchers is practical rather than romantic: choose one article, put the phone in another room, and read to the end.`,
    words: [['burst', '一阵；短时间'], ['thread', '线索；脉络'], ['interruption', '打扰'], ['rebuild', '重建'], ['uninterrupted', '不被打断的']],
    qs: [
      ['What do studies of university students show?', ['Long videos harm attention.', 'Continuous readers control attention better.', 'Short bursts are more effective.', 'Reading speed is fixed.'], 1, 'who read continuously for thirty minutes or more have better attention control。'],
      ['What does the author call a "switching cost"?', ['The price of a phone.', 'The loss caused by interruption.', 'The cost of printing books.', 'The time spent choosing texts.'], 1, '频繁被打断后重新开始所消耗的时间与精力。'],
      ['What is the researchers advice?', ['Read only short texts.', 'Read without a phone nearby.', 'Read aloud every day.', 'Give up social media.'], 1, '把手机放到另一个房间，读到结尾。'],
      ['What does the author think of screens?', ['They are the main enemy.', 'They are not the real problem.', 'They should be banned.', 'They make reading faster.'], 1, 'Screens are not the enemy; the real problem is interruption。'],
      ['What is the main idea of the passage?', ['Reading long texts is outdated.', 'Attention can be trained by continuous reading.', 'Speed matters more than understanding.', 'Students read too slowly.'], 1, '全文主张通过连续阅读训练注意力与持续理解能力。']
    ]
  },
  {
    id: 'R02', kind: 'careful', title: 'The Cost of Convenience', topic: '社会',
    passage: `Food delivery has become part of daily life on university campuses. A student can order lunch during a lecture and find it waiting at the gate fifteen minutes later. The service saves time, and for students who live far from the dining halls it is convenient. Yet convenience has a price that is rarely discussed.

The first cost is financial. Research on student spending shows that those who order delivery more than five times a week spend about twice as much on food as those who cook or eat in the hall. Over a term, that difference can equal the price of a used laptop.

The second cost is less visible. Waiting for a delivery divides the day into fragments, because students tend to avoid starting serious work when they must stop soon. Many report that they cannot study deeply in the twenty minutes before the food arrives, so the whole hour is lost.

None of this means that delivery should be abandoned. It means that it should be planned. Setting two delivery days a week, for example, keeps the convenience and controls both the spending and the lost time.`,
    words: [['delivery', '配送'], ['convenience', '便利'], ['fragment', '碎片'], ['abandon', '放弃'], ['budget', '预算']],
    qs: [
      ['What is the first cost of food delivery mentioned?', ['Health.', 'Money.', 'Time at the gate.', 'Plastic waste.'], 1, 'The first cost is financial。'],
      ['How much more may heavy users spend on food?', ['About 20% more.', 'About half as much.', 'About twice as much.', 'Three times as much.'], 2, 'spend about twice as much on food。'],
      ['Why is the second cost "less visible"?', ['It involves health.', 'It appears as lost focus rather than bills.', 'It is paid by parents.', 'It happens at night.'], 1, '等待外卖把一天切碎，导致无法开始深入的学习。'],
      ['What does the author suggest?', ['Stopping delivery completely.', 'Planning delivery days.', 'Cooking every meal.', 'Ordering only at night.'], 1, '建议设定每周两天点外卖，兼顾便利与控制成本。'],
      ['What is the tone of the passage?', ['Strongly critical.', 'Balanced and practical.', 'Humorous.', 'Indifferent.'], 1, '作者既承认便利，也指出代价，并提出可行的折中方案。']
    ]
  },
  {
    id: 'R03', kind: 'careful', title: 'Volunteering Changes the Volunteer', topic: '社会',
    passage: `When students are asked why they volunteer, most mention helping others. Follow-up interviews two years later, however, show that the volunteers themselves changed the most. The most common gains were not skills on a resume but a sense of perspective.

One student who spent weekends reading to children in a poor neighbourhood said she had stopped complaining about her own problems. Another, who helped elderly people use smartphones, reported that he became far more patient with his own parents.

Researchers warn against treating volunteering as a kind of medicine. The effect depends on how regular and how personal the contact is. Students who volunteered once or twice at large events showed almost no change, while those who met the same people weekly for a term showed clear differences in their sense of responsibility. The lesson for students is that depth matters more than the number of activities listed on a form.`,
    words: [['volunteer', '做志愿者'], ['perspective', '视角'], ['patient', '有耐心的'], ['regular', '规律的'], ['responsibility', '责任']],
    qs: [
      ['According to follow-up interviews, who changed the most?', ['The children.', 'The volunteers.', 'The researchers.', 'The school.'], 1, 'show that the volunteers themselves changed the most。'],
      ['What did the student who helped elderly people gain?', ['A new phone.', 'More patience.', 'A part-time job.', 'Better grades.'], 1, 'became far more patient with his own parents。'],
      ['What makes volunteering effective?', ['Doing it at large events.', 'Regular personal contact.', 'Getting a certificate.', 'Choosing easy tasks.'], 1, '效果取决于规律性和人际接触的深度。'],
      ['What is the main message?', ['Volunteering looks good on a resume.', 'Depth matters more than quantity.', 'Students should not volunteer.', 'Elderly people need help.'], 1, '志愿者活动的深度比活动数量更重要。']
    ]
  },
  {
    id: 'R04', kind: 'careful', title: 'Sleep, Memory and the Student Brain', topic: '科学',
    passage: `Students often treat sleep as the first thing to give up when exams approach. Brain research suggests that this is exactly the wrong choice. During deep sleep the brain replays what was learned during the day and moves it into long-term storage. Cutting sleep therefore does not add study time; it removes the time when learning is fixed.

In one well-known experiment, students learned a list of words and were then divided into two groups. One group slept for eight hours, while the other stayed awake. When both were tested the next day, the sleep group remembered about thirty-five percent more words. The result has been repeated many times with different materials, including grammar rules and pronunciation.

The practical advice is not simply to sleep longer. It is to place sleep where it helps most: review new material in the evening, sleep, and test yourself in the morning. Many students find that twenty minutes of evening review is worth an hour of late-night repetition.`,
    words: [['replay', '重放'], ['storage', '存储'], ['stay awake', '保持清醒'], ['repetition', '重复']],
    qs: [
      ['What happens during deep sleep?', ['The brain rests completely.', 'Learning is moved to long-term storage.', 'New words are forgotten.', 'The body repairs muscles only.'], 1, 'During deep sleep the brain... moves it into long-term storage。'],
      ['Cutting sleep mainly means what?', ['More study time.', 'Losing the time when learning is fixed.', 'Better memory.', 'Fewer dreams.'], 1, '减少睡眠并不能增加学习时间，而是去掉了巩固学习的时间。'],
      ['How much better did the sleep group do?', ['About 15% better.', 'About 35% better.', 'About 50% better.', 'No difference.'], 1, 'remembered about thirty-five percent more words。'],
      ['What is the practical advice?', ['Sleep eight hours in total.', 'Review in the evening and sleep.', 'Study only at night.', 'Take naps every hour.'], 1, '晚上复习新内容，然后睡觉，早上自测。']
    ]
  },
  {
    id: 'R05', kind: 'careful', title: 'Small Towns, Big Screens', topic: '科技',
    passage: `For a long time, people in small towns had limited access to museums, concerts and libraries. Streaming services were expected to make city life unnecessary. The reality has been more complicated. Cultural events are indeed available everywhere now, but the number of people who take part in local activities has fallen in some towns, because the same screen that brings the concert also makes going out seem unnecessary.

Not every town follows this pattern. Where local groups combine online material with real meetings, the two support each other. A book club in one town, for example, watches an author interview online, then meets to discuss it. Attendance doubled in a year.

The lesson is that technology does not replace local life automatically. It replaces it only when there is nothing else offered. Where a real meeting exists, screens can make it stronger.`,
    words: [['access', '获取途径'], ['streaming', '流媒体'], ['attendance', '参与人数'], ['automatically', '自动地']],
    qs: [
      ['What was expected of streaming services?', ['To raise ticket prices.', 'To make city life unnecessary.', 'To close museums.', 'To reduce internet use.'], 1, 'were expected to make city life unnecessary。'],
      ['What happened in some towns?', ['Local activities increased.', 'Participation in local activities fell.', 'Screens were banned.', 'Libraries closed.'], 1, 'the number of people who take part in local activities has fallen。'],
      ['What helped the book club grow?', ['Lower prices.', 'Combining online material with real meetings.', 'Free books.', 'More advertising.'], 1, '线上材料与线下聚会结合，参与人数翻倍。']
    ]
  },
  {
    id: 'R06', kind: 'matching', title: 'How to Study a Foreign Language', topic: '学习',
    passage: `A. Beginners often believe that they must learn grammar rules before they can speak. In fact, most learners who become fluent start by copying useful sentences and using them in real situations.

B. Vocabulary learned in isolation is forgotten quickly. Words become stable when they are met again and again in different contexts, especially in reading that the learner actually enjoys.

C. Learners who set a fixed hour for study are far more likely to continue than those who wait for a free moment, because the decision is made once rather than every day.

D. Mistakes are the point of practice. Learners who avoid speaking until they are sure make slower progress than those who speak badly and receive correction.

E. Listening to fast speech is difficult at first, not because the words are unknown, but because the learner has never heard the words joined together. Practising short passages repeatedly solves this within weeks.

F. Writing is the slowest skill to improve, but it can be accelerated by rewriting a text the learner has already written once, with attention to one problem at a time.

G. Motivation drops when progress cannot be seen. A simple record of the hours spent and the items completed keeps most learners going through the middle stage.

H. Native speakers are not always good teachers, yet any conversation with them is valuable because it forces the learner to use what has been stored.`,
    words: [['isolation', '孤立'], ['stable', '稳固的'], ['correction', '纠正'], ['accelerate', '加速'], ['motivation', '动力']],
    qs: [
      ['Studying at the same time each day makes it easier to keep the habit.', ['A', 'C', 'F', 'H'], 1, 'C 段：固定时间学习的人更可能坚持。'],
      ['New words are remembered best when met repeatedly in real contexts.', ['B', 'D', 'E', 'G'], 0, 'B 段：词要在不同语境中反复遇到才稳固。'],
      ['Learners improve faster if they speak and accept correction.', ['A', 'D', 'E', 'H'], 1, 'D 段：不怕说错并接受纠正的人进步更快。'],
      ['Hearing words joined together is the key difficulty in listening.', ['B', 'C', 'E', 'H'], 2, 'E 段：难在于从未听过连读的词。'],
      ['Rewriting an old piece with one focus helps writing.', ['A', 'F', 'G', 'H'], 1, 'F 段：带着一个重点重写旧作可以加速。'],
      ['Recording hours and finished items keeps learners going.', ['C', 'D', 'G', 'H'], 2, 'G 段：记录投入与完成项能维持动力。'],
      ['Fluent learners often begin by copying sentences instead of studying rules.', ['A', 'B', 'D', 'F'], 0, 'A 段：先模仿有用句子。']
    ]
  },
  {
    id: 'R07', kind: 'matching', title: 'City Life and Public Space', topic: '社会',
    passage: `A. A city becomes comfortable not when it has more roads but when the space between buildings can be used by everyone, including children and the elderly.

B. Benches are among the cheapest public facilities, yet they decide whether older residents can leave home with confidence. Removing them to prevent certain uses often removes the people who need them most.

C. Trees do more than cool streets. Studies show that a row of trees along a walking path raises the number of pedestrians by a third, because shade makes walking pleasant.

D. Markets create the densest social contact of any urban space, which is why cities that protect small markets often have stronger neighbourhood ties.

E. Designing for cars first produces wide roads and long crossing times. Designing for people first produces blocks that are easy to walk through, and traffic tends to slow down by itself.

F. Public space fails when it is designed for a single group. A square used only by office workers at noon is empty for most of the day; a square that attracts several groups is busy from morning until night.

G. Safety at night depends more on the number of people on the street than on the number of cameras, according to most urban studies.`,
    words: [['facility', '设施'], ['pedestrian', '行人'], ['neighbourhood', '社区'], ['densest', '最密集的']],
    qs: [
      ['Public facilities such as benches keep older residents active.', ['A', 'B', 'C', 'E'], 1, 'B 段：长椅决定老人能否自信出门。'],
      ['Trees increase the number of people walking.', ['B', 'C', 'D', 'G'], 1, 'C 段：树荫使步行更舒适，行人增加三分之一。'],
      ['Markets strengthen neighbourhood ties.', ['C', 'D', 'F', 'G'], 1, 'D 段：市场让社区联系更强。'],
      ['Traffic slows when roads are designed for people.', ['B', 'E', 'F', 'G'], 1, 'E 段：以人为本设计时车流会自然减速。'],
      ['A successful square serves many groups through the day.', ['A', 'D', 'F', 'G'], 2, 'F 段：吸引多类人群的广场全天都热闹。']
    ]
  },
  {
    id: 'R08', kind: 'cloze', title: 'Study Habits That Survive', topic: '学习',
    passage: `Most study plans fail in the second week, and the reason is rarely laziness. Plans fail because they are built on an ideal day __1__ on a real one. A student decides to study three hours every evening, and when one evening is __2__ by a friend's birthday, the whole plan feels broken.

The solution is to set a __3__ goal that can be reached even on a bad day, such as twenty minutes of review. Once that base is __4__, extra effort becomes a bonus rather than a proof of failure. Another useful rule is to decide __5__ where and when you will study, because the habit then depends on a place and a time rather than on mood.

Finally, progress should be __6__. A chart of completed days gives something that a feeling of improvement cannot: evidence.`,
    words: [['ideal', '理想的'], ['laziness', '懒惰'], ['bonus', '额外收获'], ['evidence', '证据']],
    qs: [
      ['Choose the best word for blank 1.', ['other', 'rather than', 'instead of', 'because of'], 1, 'built on an ideal day rather than on a real one：建立在理想的一天而非真实的一天上。'],
      ['Choose the best word for blank 2.', ['created', 'destroyed', 'shared', 'recorded'], 1, '一个晚上被朋友的生日破坏，整份计划就崩了。'],
      ['Choose the best word for blank 3.', ['higher', 'minimum', 'final', 'secret'], 1, 'minimum goal 最低目标，坏日子也能完成。'],
      ['Choose the best word for blank 4.', ['hidden', 'lost', 'reached', 'changed'], 2, 'once that base is reached 一旦达到最低标准。'],
      ['Choose the best word for blank 5.', ['in advance', 'in secret', 'by chance', 'for fun'], 0, '提前决定地点和时间，habit 才不依赖情绪。'],
      ['Choose the best word for blank 6.', ['ignored', 'recorded', 'hidden', 'feared'], 1, 'progress should be recorded：进度要记录下来。']
    ]
  }
];
