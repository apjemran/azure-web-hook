module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.body.pages && req.body.pages[0] && req.body.pages[0].title){
        context.res = {
            body: "Page is " + req.body.pages[0].title + ", Action is " + req.body.pages[0].action + ", Event Type is " + req.headers['x-github-event']
        };
    }else if(req.body.pusher){
        context.res = {
            status: 200,
            body: "Code Push By "+ req.body.pusher.name
        }        
    }else {
        context.res = {
            status: 400,
            body: ("Invalid payload for Wiki event")
        }
    }
}