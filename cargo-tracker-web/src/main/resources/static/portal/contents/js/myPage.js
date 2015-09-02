"use strict";

page.MyPage = function () {

    comm.initPage();

    var datas = {

        tableheaders : [
            {display:'ID',	 	hidden:true , width: '0%' },
            {display:'No.',	 	hidden:false, width: '10%' },
            {display:'Question',hidden:false, width: '40%'},
            {display:'Writer',	hidden:false, width: '40%'},
            {display:'Answered',hidden:false, width: '10%'}
        ],
        tabledatas: [
            {
            	id: '1',
            	no: '1',
            	question: 'test',
                name: 'bioderma',
                answered: 'false'
            },{
            	id: '2',
            	no: '2',
            	question: 'I want to change my name',
                name: 'admin',
                answered: 'false'
            },{
            	id: '3',
            	no: '3',
            	question: 'How to track my cargo?',
                name: 'Haha',
                answered: 'false'
            },{
            	id: '4',
            	no: '4',
            	question: 'Where is my cargo??',
                name: 'Seolhyun',
                answered: 'true'
            }
        ]
    }; // RESTful api callback data example


    template.RenderOne({
        target: "#body",
        tagName: "div",
        className: "my-page",
        id: "bodyMyPage",
        position: "new",
        template: comm.getHtml("contents/my-page.html"),
        data: datas,
        events: {
            "click .my-page": function () {
                alert("board!");
            }
        }
    });
};