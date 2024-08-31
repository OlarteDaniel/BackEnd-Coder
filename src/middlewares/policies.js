export const executePolicies = (policies) =>{
    return (req,res,next)=>{
        if(policies.includes('PUBLIC') && !req.user) return next();
        if(policies.includes('PUBLIC') && req.user) return res.redirect('/');
        if(!policies.includes('PUBLIC') && !req.user) return res.redirect('/login');
        if(policies.includes(req?.user?.role?.toUpperCase())) return next();
        return res.redirect('/unauthorized');
    }
}