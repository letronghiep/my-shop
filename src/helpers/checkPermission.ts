export const checkPermission = (
  permission: string,
  targetPermission: string
) => {
  return permission === targetPermission;
};
