export const adminIdgenerator = async (req: Request, res: Response) => {
  const adminId = Math.floor(Math.random() * 10000);
  console.log(adminId);
};
