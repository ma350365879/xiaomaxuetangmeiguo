var QuestionObject = AV.Object.extend('Question');
var question = new QuestionObject();

var question_data = {
    UID: "ERMYR131",
    type: "FI",
    content: "在某校组织的知识竞赛中共有三种试题,其中语文类4题，综合类8题，数学类若干题。已知从中随机抽取一题,是数学类的概率是2/3,则数学类有_____题。",
    img_src: "",
    answers: ["24"],
    possible_wrong_answers: {
        wrong_answers: ["12"],
        hint_for_wrong_answers: ["test"]
    },
    hints: [
        "语文类4题，综合类8题，数学类x题，则：x/(x+4+8)=2/3。这个方程的解是？",
        "3x=2(x+4+8)",
        "3x=2x+24",
        "x=24"
    ],
    video_url: "http://player.polyv.net/videos/player.swf?vid=c6130d0cbb604631899beb3657646e1e_c",
    knowledge_components: ["KC_ID_M10101", "KC_ID_M10102"],
};

question.save(question_data).then(function() {
  console.log('question data uploaded');
}).catch(function(err) {
  console.log('error:' + err);
});
