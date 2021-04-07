const Crypto = require('crypto');
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const hmac = Crypto.createHmac("sha1", "eeEE6xk0Fqmw2Sv3ckPUv4A8cxrb2Wv13kO/xrqE3IfzH5AI1D1Wjw==");
    const signature = hmac.update(JSON.stringify(req.body)).digest('hex');
    const shaSignature =  `sha1=${signature}`;
    const gitHubSignature = req.headers['x-hub-signature'];

    if (!shaSignature.localeCompare(gitHubSignature)) {
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
    }else{
        context.res = {
            status: 401,
            body: "Signatures don't match"
        };
    }    
}