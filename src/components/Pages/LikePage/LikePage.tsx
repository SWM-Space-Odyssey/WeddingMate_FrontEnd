import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import CompanyLike from "./sections/CompanyLike";
import PortfolioLike from "./sections/PortfolioLike";
import ItemLike from "./sections/ItemLike";

type Props = {};

const LikePage = (props: Props) => {
  const [pageValue, setPageValue] = useState<string>("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setPageValue(newValue);
  };
  const TabPanelSX = { p: 0, overflow: "scroll" };
  return (
    <div className='w-full h-full flex flex-col overflow-y-scroll'>
      <TabContext value={pageValue}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            position: "sticky",
            top: 0,
            bgcolor: "background.paper",
          }}
        >
          <TabList onChange={handleChange} variant='fullWidth'>
            <Tab label='업체' value='1' />
            <Tab label='포트폴리오' value='2' />
            <Tab label='아이템' value='3' />
          </TabList>
        </Box>
        <TabPanel sx={TabPanelSX} value='1'>
          <CompanyLike />
        </TabPanel>
        <TabPanel sx={TabPanelSX} value='2'>
          <PortfolioLike />
        </TabPanel>
        <TabPanel sx={TabPanelSX} value='3'>
          <ItemLike />
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default LikePage;
