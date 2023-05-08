export default [
  {
    key: 'helper-sign-in',
    loader: () => import('@views/platform/signIn'),
    path: '/helper/sign-in',
  },
  {
    key: 'helper-application-list',
    loader: () => import('@views/platform/applicationList'),
    path: '/helper/application-list',
  },
  {
    key: 'helper-account-list',
    loader: () => import('@views/platform/accountList'),
    path: '/helper/account-list',
  },
];
export function checkPermission(key, menuList, router) {
  const item = router.find((v) => v.key === key);

  if (item.parentKey && !item.ownAuth) {
    return checkPermission(item.parentKey, menuList, router);
  }
  return !!menuList.find((v) => v.menuCode === key);
}
