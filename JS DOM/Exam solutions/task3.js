
function solve() {
    return function () {
        var template = [
            '<h1>{{title}}</h1>'+
            '<ul>'+
            '{{#posts}}'+
            '<li>'+
            '<div class="post">'+
            '<p class="author">'+
            '<a class="{{#if author}}user{{else}}anonymous{{/if}}" {{#if author}}href="/user/{{author}}"{{/if}}>{{#if author}}{{author}}{{else}}Anonymous{{/if}}</a>&nbsp;'+
            '</p>'+
            '<pre class="content">{{{text}}}</pre>'+
            '</div>'+
            '<ul>'+
            '{{#comments}}'+
            '{{#unless deleted}}' +
            '<li>'+
            '<div class="comment">'+
            '<p class="author">'+
            '<a class="{{#if author}}user{{else}}anonymous{{/if}}" {{#if author}}href="/user/{{author}}"{{/if}}>{{#if author}}{{author}}{{else}}Anonymous{{/if}}</a>&nbsp;'+
            '</p>'+
            '<pre class="content">{{{text}}}</pre>'+
            '</div>'+
            '</li>'+
            '{{/unless}}' +
            '{{/comments}}'+
            '</ul>'+
            '</li>'+
            '{{/posts}}'+
            '</ul>'
        ].join('\n');

        return template;
    }
}

function solve() {
    return function() {
        var template =
 
            '<h1>{{title}}</h1>'+
            '<ul>' +
                '{{#posts}}'+
                '<li>'+
                    '<div class="post">' +
                        '{{#if author}}'+
                            '<p class="author"><a class="user" href="/user/{{author}}">{{author}}</a></p>'+
                        '{{else}}'+
                            '<p class="author"><a class="anonymous">Anonymous</a></p>'+
                        '{{/if}}'+
                            '<pre class="content">{{{text}}}</pre>'+
                    '</div>'+
                    '<ul>' +
                        '{{#comments}}'+
                            '{{#if deleted}}'+
                            '{{else}}'+
                            '<li>'+
                                '<div class="comment">'+
                                    '{{#if author}}'+
                                    '<p class="author"><a class="user" href="/user/{{author}}">{{author}}</a></p>'+
                                    '{{else}}'+
                                    '<p class="author"><a class="anonymous">Anonymous</a></p>'+
                                    '{{/if}}'+
                                    '<pre class="content">{{{text}}}</pre>'+
                                '</div>'+
                            '</li>'+
                            '{{/if}}'+
                        '{{/comments}}'+
                    '</ul>'+
                '</li>'+
                '{{/posts}}'+
            '</ul>'
            ;
        return template;
    }
}

