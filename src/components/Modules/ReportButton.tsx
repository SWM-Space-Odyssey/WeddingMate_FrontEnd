import React from "react";

type Props = {
  body: {
    reportedUserId: number;
    reportedItemId: number;
    reportReson:
      | "SPAM"
      | "SEXUAL"
      | "ILLEGAL"
      | "FAKE"
      | "INTELLECTUAL_PROPERTY"
      | "OTHER";
    reportItemType: "PORTFOLIO" | "ITEM" | "USER";
  };
};

const ReportButton = (props: Props) => {
  return <div>ReportButton</div>;
};

export default ReportButton;
