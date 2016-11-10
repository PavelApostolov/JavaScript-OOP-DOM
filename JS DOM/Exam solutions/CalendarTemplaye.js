function solve() {
    return function (selector) {
   
    // това template-та като стринг
     var template =
        '{{#data}} <div class="events-calendar"><h2 class="header">Appointments for <span class="month">{{month}}</span><span class="year">{{year}}</span> </h2>{{#days}}<div class="col-date"><div class="date">{{day}}</div><div class="events">{{#events}}<div class="event {{importance}}"{{#if title}} title="{{comment}}"{{/if}}><div class="title">{{#if title}}{{title}}{{else}}Free slot{{/if}}</div>{{#if time}}<span class="time">at: {{time}}</span>{{/if}}</div>{{/events}}</div></div>{{/days}}</div>{{/data}}';
   
    // това е data теста
      var data = {
        year: 2015,
        month: 'August',
        days: [{
            day: 3,
            events: [{
                duration: 765,
                importance: 'none'
            }, {
                title: 'My Event 1',
                time: '12:45',
                duration: 60,
                comment: 'no comment',
                importance: 'critical'
            }, {
                duration: 15,
                importance: 'none'
            }, {
                title: 'My Event 2',
                time: '14:00',
                duration: 120,
                comment: 'no comment',
                importance: 'important'
            }, {
                duration: 60,
                importance: 'none'
            }, {
                title: 'My Event 4',
                time: '17:00',
                duration: 60,
                comment: 'no comment',
                importance: 'unimportant'
            }, {
                duration: 360,
                importance: 'none'
            }]
        }, {
            day: 4,
            events: [{
                duration: 750,
                importance: 'none'
            }, {
                title: 'Prepare for the Exam',
                time: '12:30',
                duration: 480,
                comment: 'no comment',
                importance: 'important'
            }, {
                duration: 210,
                importance: 'none'
            }],
        }, {
            day: 5,
            events: [{
                duration: 1320,
                importance: 'none'
            }, {
                title: 'PARTY',
                time: '22:00',
                duration: 120,
                comment: 'I must be there',
                importance: 'unimportant'
            }],
        }, {
            day: 6,
            events: [{
                title: 'PARTY',
                time: '0:00',
                duration: 180,
                comment: 'I must be there',
                importance: 'unimportant'
            }, {
                duration: 390,
                importance: 'none'
            }, {
                title: 'JS UI & DOM Exam',
                time: '9:30',
                duration: 780,
                comment: 'Keep your fingers crossed',
                importance: 'critical'
            }, {
                duration: 90,
                importance: 'none'
            }],
        }, {
            day: 7,
            events: [{
                title: 'Vacation',
                time: '0:00',
                duration: 1440,
                comment: 'Finaly some time to relax',
                importance: 'vacation'
            }],
        }, {
            day: 8,
            events: [{
                title: 'Vacation',
                time: '0:00',
                duration: 1440,
                comment: 'Finaly some time to relax',
                importance: 'vacation'
            }],
        }, {
            day: 9,
            events: [{
                title: 'Vacation',
                time: '0:00',
                duration: 1440,
                comment: 'Finaly some time to relax',
                importance: 'vacation'
            }],
        }]
    };
   
     var template = '{{#data}}'+
            '<div class="events-calendar">' +
                '<h2 class="header">' +
                    'Appointments for ' +
                    '<span class="month">{{month}}</span>' +
                    ' <span class="year">{{year}}</span>' +
                '</h2>' +
            '{{#days}}' +
            '<div class="col-date">' +
                '<div class="date">' +
                    '{{day}}' +
                '</div>' +
                '<div class="events">' +  
                   '{{#events}}' +
                    '<div class="event {{importance}}"' +
                        '{{#if title}} title="{{comment}}"{{/if}}>' +
                        '<div class="title">' +
                            '{{#if title}} {{title}} {{else}}Free slot{{/if}}' +
                        '</div>' +
                        '{{#if time}}' +
                        '<span class="time">at: {{time}}</span>' +
                        '{{/if}}' +
                    '</div>' +
                    '{{/events}}' +
                '</div>' +          
            '</div>' +
            '{{/days}}' +
        '</div>' +
        '{{/data}}';
           
        document.getElementById(selector).innerHTML = template;
 
    };
}
 
module.exports = solve;

//Author
function solve() {
    return function (selector) {
        var template = '<div class="events-calendar">' +
                '<h2 class="header">Appointments for <span class="month">{{month}}</span> <span class="year">{{year}}</span></h2>' +
                '{{#days}}' +
                    '<div class="col-date">' +
                        '<div class="date">{{day}}</div>' +
                        '<div class="events">' +
                            '{{#each events}}' +
                                '{{#if title}}' +
                                    '<div class="event {{importance}}" title="{{comment}}">' +
                                        '<div class="title">{{title}}</div>' +
                                        '<span class="time">at: {{time}}</span>' +
                                    '</div>' +
                                '{{else}}' +
                                    '<div class="event {{importance}}">' +
                                        '<div class="title">Free slot</div>' +
                                    '</div>' +
                                '{{/if}}' +
                            '{{/each}}' +
                        '</div>' +
                    '</div>' +
                '{{/days}}' +
        '</div>';
        document.getElementById(selector).innerHTML = template;
    };
}

module.exports = solve;

//Author variant 2
function solve() {
    return function (selector) {
        var template = '<div class="event-calendar">' +
                '<h2 class="header">Appointments for <span class="month">{{month}}</span> <span class="year">{{year}}</span></h2>' +
                '{{#days}}' +
                    '<div class="col-date">' +
                        '<div class="date">{{day}}</div>' +
                        '<div class="events">' +
                            '{{#each events}}' +
                                '{{#if title}}' +
                                    '<div class="event {{importance}}" title="duration: {{duration}}">' +
                                        '<div class="title">{{title}}</div>' +
                                        '<span class="time">at: {{time}}</span>' +
                                    '</div>' +
                                '{{else}}' +
                                    '<div class="event {{importance}}">' +
                                        '<div class="title">Free slot</div>' +
                                    '</div>' +
                                '{{/if}}' +
                            '{{/each}}' +
                        '</div>' +
                    '</div>' +
                '{{/days}}' +
        '</div>';
        document.getElementById(selector).innerHTML = template;
    };
}

module.exports = solve;

//Random
function solve() {
    return function (selector) {
        var template = 
        '<div class="event-calendar">' +
            '<h2 class="header">Appointments for <span class="month">{{this.month}}</span> <span class="year">{{this.year}}</span></h2>' +
            '{{#each days}}' +
                '<div class="col-date">' +
                '<div class="date">{{this.day}}</div>' +
                '<div class="events">' +
                '{{#each events}}' +
                    '<div class="event {{this.importance}}" title="duration: {{this.duration}}" >' +
                    '<div class = "title">{{#if title}}{{this.title}}{{else}}Free slot{{/if}}</div>' +
                    '{{#if time}}<span class="time">at: {{this.time}}</span>{{/if}}'+
                    '</div>' +
                '{{/each}}' +
                '</div>' +
                '</div>'+
            '{{/each}}'+
        '</div>';

        document.getElementById(selector).innerHTML = template;
    };
}

module.exports = solve;

        // <div class="event-calendar">
        // <h2 class="header">Appointments for <span class="month">August</span> <span class="year">2015</span></h2>
        // <div class="col-date">
        //         <div class="date">4</div>
        //         <div class="events">
        //             <div class="event none">
        //                 <div class="title">Free slot</div>
        //             </div>
        //             <div class="event important" title="duration: 480">
        //                 <div class="title">Prepare for the Exam</div>
        //                 <span class="time">at: 12:30</span>
        //             </div>
        //             <div class="event none">
        //                 <div class="title">Free slot</div>
        //             </div>
        //         </div>
        // </div>
// </div>

function solve() {
    return function (selector) {
        var template =
            '<div class="event-calendar">' +
                '<h2 class="header">Appointments for <span class="month">{{month}}</span> <span class="year">{{year}}</span></h2>' +
                    '{{#each days}}' +
                    '<div class="col-date">' +
                        '<div class="date">{{day}}</div>' +
                        '<div class="events">' +
                            '{{#each events}}' +
                            '<div class="event {{importance}}" {{#if title}}  title="duration: {{duration}}" {{/if}}>' +
                                '<div class="title">{{#if title}}{{title}}{{else}}Free slot{{/if}}</div>' +
                                '{{#if time}}' +
                                    '<span class="time">at: {{time}}</span>' +
                                '{{/if}}' +
                            '</div>' +
                            '{{/each}}' +
                        '</div>' +
                    '</div>' +
                    '{{/each}}' +
        '</div>';

        document.getElementById(selector).innerHTML = template;
    };
}

module.exports = solve;