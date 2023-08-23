import qs from 'qs';
export const sortQueryMiddleware = (req, res, next) => {
  if (req.url.indexOf('?') > 0) {
    req.url = req.url.replace(/roleName/g, 'role.name');
    req.url = req.url.replace(/jobTitleName/g, 'jobTitle.name');
    req.url = req.url.replace(/jobTitleAlias/g, 'jobTitle.alias');
    req.query = qs.parse(req.url.split('?')[1], { depth: 20 });
  }
  next();
};
