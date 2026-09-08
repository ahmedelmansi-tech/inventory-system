const page = async ({ params }) => {
  const { path } = await params;
  console.log(path);

  return <div>ACCOUNT FOR : {path}</div>;
};

export default page;
