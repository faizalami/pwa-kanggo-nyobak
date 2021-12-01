export default async (service, items) => {
  await Promise.all(items.map(item => service.save(item)));
};
