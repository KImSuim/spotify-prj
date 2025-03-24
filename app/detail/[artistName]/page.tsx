import { DetailProps } from "@/common/Type/type";
import DetailList from "@/components/detailList/DetailList";

const DetailPage = async ({ params }: DetailProps) => {
  const { artistName } = await params;

  return (
    <div>
      <DetailList artistName={artistName}></DetailList>
    </div>
  );
};

export default DetailPage;
