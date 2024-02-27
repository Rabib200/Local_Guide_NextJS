import { PrismaClient } from "@prisma/client";
import Plans from "../components/cards/Plans";

const prisma = new PrismaClient();

const fetchPlansByPackage = async (prop: string | undefined) => {
  const select = {
    id: true,
    type: true,
    title: true,
    cost: true,
    duration: true,
    transportation: true,
    image: true,
    package_name: true,
  };

  if (!prop) return await prisma.plans.findMany({ select });

  const plans = await prisma.plans.findMany({
    where: {
      package_name: {
        equals: prop.toLowerCase(),
      },
    },
    select,
  });
  return plans;
};

export default async function Search({
  searchParams,
}: {
  searchParams: { prop: string | undefined };
}) {
  const { prop } = searchParams;
  const plans = await fetchPlansByPackage(prop);

  return <Plans plansData={plans} />;
}
