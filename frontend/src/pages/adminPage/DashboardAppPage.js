import React, { useState, useEffect } from 'react';

import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Paper } from '@mui/material';

import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
// components
import Iconify from '../../components/iconify';
// sections
import {
  AppTasks,
  AppCurrentVisits,
  AppTrafficBySite,
  AppWidgetSummary,

} from '../../sections/@admin/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  const [All, setAll] = useState([]);
  const [productFactory, setProductFactory] = useState([]);
  const [productAgency, setProductAgency] = useState([]);
  const [productGuarantee, setProductGuarantee] = useState([]);

  const getAll = async () => {
    try {
      const response = await axios.get("http://localhost:8000/admin/statistic-all");
      setAll(response.data);
    }
    catch (err) {
      alert(err.message);
    }
  };

  const getProductFactory = async () => {
    try {
      const response = await axios.get("http://localhost:8000/admin/statistic-factory");
      setProductFactory(response.data);
    }
    catch (err) {
      alert(err.message);
    }
  };

  const getProductAgency = async () => {
    try {
      const response = await axios.get("http://localhost:8000/admin/statistic-agency");
      setProductAgency(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  const getProductGuarantee = async () => {
    try {
      const response = await axios.get("http://localhost:8000/admin/statistic-guarantee");
      setProductGuarantee(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  const getSumFactory = () => {
    const sum = { inventory: 0, sold: 0, error: 0 }
    for (let i = 0; i < productFactory.length; i += 1) {
      sum.inventory += productFactory[i].inventory;
      sum.sold += productFactory[i].sold;
      sum.error += productFactory[i].error;
    }
    return sum;
  }
  const sumFactory = getSumFactory();

  const getSumAgency = () => {
    const sum = { inventory: 0, sold: 0, error: 0 }
    for (let i = 0; i < productAgency.length; i += 1) {
      sum.inventory += productAgency[i].inventory;
      sum.sold += productAgency[i].sold;
      sum.error += productAgency[i].error;
    }
    return sum;
  }
  const sumAgency = getSumAgency();

  const getSumGuarantee = () => {
    const sum = { done: 0, insurancing: 0, error: 0 }
    for (let i = 0; i < productGuarantee.length; i += 1) {
      sum.done += productGuarantee[i].done;
      sum.insurancing += productGuarantee[i].insurancing;
      sum.error += productGuarantee[i].error;
    }
    return sum;
  }
  const sumGuarantee = getSumGuarantee();

  const seriesF = [{
    name: 'T???n kho',
    data: productFactory.map(f => f.inventory),
  }, {
    name: '???? b??n',
    data: productFactory.map(f => f.sold)
  }, {
    name: 'L???i',
    data: productFactory.map(f => f.error)
  }];

  const optionsF = {
    chart: {
      type: 'bar',
      height: 500
    },
    title: {
      text: 'Th???ng k?? s???n ph???m t???i c?? s??? s???n xu???t',
      floating: true,
      offsetY: 0,
      align: 'center',
      style: {
        color: '#444',
        fontFamily: 'Public Sans,sans-serif',
        fontSize: '20'
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: productFactory.map(f => f.name),
    },
    yaxis: {
      title: {
        text: 's???n ph???m',
        style: {
          color: '#444',
          fontFamily: 'Public Sans,sans-serif',
          fontSize: '15'
        }
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: (val) => {
          return "".concat(val).concat(" s???n ph???m");
        }
      }
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ['T???n kho', '???? b??n', 'L???i'],
      markers: {
        fillColors: ['rgba(0, 143, 251, 0.85)', 'rgba(0, 227, 150, 0.85)', 'rgba(254, 176, 25, 0.85)']
      }
    }

  };
  const seriesA = [{
    name: 'T???n kho',
    data: productAgency.map(a => a.inventory),
  }, {
    name: '???? b??n',
    data: productAgency.map(a => a.sold)
  }, {
    name: '??? qu?? l??u',
    data: productAgency.map(a => a.error)
  }];

  const optionsA = {
    chart: {
      type: 'bar',
      height: 500
    },
    title: {
      text: 'Th???ng k?? s???n ph???m t???i ?????i l??',
      floating: true,
      offsetY: 0,
      align: 'center',
      style: {
        color: '#444',
        fontFamily: 'Public Sans,sans-serif',
        fontSize: '20'
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: productAgency.map(a => a.name),
    },
    yaxis: {
      title: {
        text: 's???n ph???m',
        style: {
          color: '#444',
          fontFamily: 'Public Sans,sans-serif',
          fontSize: '15'
        }
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: (val) => {
          return "".concat(val).concat(" s???n ph???m");
        }
      }
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ['T???n kho', '???? b??n', '??? qu?? l??u'],
      markers: {
        fillColors: ['rgba(0, 143, 251, 0.85)', 'rgba(0, 227, 150, 0.85)', 'rgba(254, 176, 25, 0.85)']
      }
    }

  };

  const seriesG = [{
    name: 'B???o h??nh xong',
    data: productGuarantee.map(g => g.done),
  }, {
    name: '??ang b???o h??nh',
    data: productGuarantee.map(g => g.insurancing)
  }, {
    name: 'L???i',
    data: productGuarantee.map(g => g.error)
  }];

  const optionsG = {
    chart: {
      type: 'bar',
      height: 500
    },
    title: {
      text: 'Th???ng k?? s???n ph???m t???i trung t??m b???o h??nh',
      floating: true,
      offsetY: 0,
      align: 'center',
      style: {
        color: '#444',
        fontFamily: 'Public Sans,sans-serif',
        fontSize: '20'
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: productGuarantee.map(g => g.name),
    },
    yaxis: {
      title: {
        text: 's???n ph???m',
        style: {
          color: '#444',
          fontFamily: 'Public Sans,sans-serif',
          fontSize: '15'
        }
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: (val) => {
          return "".concat(val).concat(" s???n ph???m");
        }
      }
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ['B???o h??nh xong', '??ang b???o h??nh', 'L???i'],
      markers: {
        fillColors: ['rgba(0, 143, 251, 0.85)', 'rgba(0, 227, 150, 0.85)', 'rgba(254, 176, 25, 0.85)']
      }
    }

  };

  useEffect(() => { getAll(); }, []);
  useEffect(() => { getProductFactory(); }, []);
  useEffect(() => { getProductAgency(); }, []);
  useEffect(() => { getProductGuarantee(); }, []);
  return (
    <>
      <Helmet>
        <title> Dashboard | ProductionMove </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="S???n ph???m t???i C?? s??? s???n xu???t" total={All.factory} icon={'tabler:building-factory-2'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="S???n ph???m t???i ?????i l??" total={All.agency} color="info" icon={'fluent:building-shop-20-regular'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="S???n ph???m ??ang b???o h??nh" total={All.guarantee} color="warning" icon={'fluent:building-retail-shield-24-regular'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="S???n ph???m L???i" total={All.error} color="error" icon={'bxs:error-alt'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <Paper>
              <Paper>
                <ReactApexChart options={optionsF} series={seriesF} type="bar" height={500} />
              </Paper>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="T??? l??? s???n ph???m ??? c?? s??? s???n xu???t"
              chartData={[
                { label: 'T???n kho', value: sumFactory.inventory },
                { label: '???? b??n', value: sumFactory.sold },
                { label: 'L???i', value: sumFactory.error },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.success.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <Paper>
              <ReactApexChart options={optionsA} series={seriesA} type="bar" height={500} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="T??? l??? s???n ph???m ??? ?????i l??"
              chartData={[
                { label: 'T???n kho', value: sumAgency.inventory },
                { label: '???? b??n', value: sumAgency.sold },
                { label: 'L???i', value: sumAgency.error },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.success.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <Paper>
              <ReactApexChart options={optionsG} series={seriesG} type="bar" height={500} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="T??? l??? s???n ph???m ??? trung t??m b???o h??nh"
              chartData={[
                { label: 'B???o h??nh xong', value: sumGuarantee.done },
                { label: '??ang b???o h??nh', value: sumGuarantee.insurancing },
                { label: 'L???i', value: sumGuarantee.error },
              ]}
              chartColors={[
                theme.palette.success.main,
                theme.palette.primary.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
