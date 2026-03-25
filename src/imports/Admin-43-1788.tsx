import svgPaths from "./svg-apomaw4n5h";
import imgImageValu from "figma:asset/dd263ea74eea751edbe19c75046ad4c686cd593c.png";

function ImageValu() {
  return (
    <div className="h-[31.993px] relative rounded-[8px] shrink-0 w-[39.678px]" data-name="Image (Valu$)">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[8px]">
        <div className="absolute bg-white inset-0 rounded-[8px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[8px] size-full" src={imgImageValu} />
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#f26522] relative rounded-[8px] shrink-0 size-[32px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <ImageValu />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
          <p className="leading-[normal]">Valu$ Wholesale</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="bg-[#ff6900] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center pb-[25px] pt-[24px] px-[24px] relative w-full">
          <Background />
          <Container />
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f26522] text-[8px] whitespace-nowrap">
        <p className="leading-[8px]"></p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="bg-[#fff0e5] relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative w-full">
          <Container1 />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f26522] text-[14px] whitespace-nowrap">
            <p className="leading-[normal]">Dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[8px] whitespace-nowrap">
        <p className="leading-[8px]"></p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative w-full">
          <Container2 />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] whitespace-nowrap">
            <p className="leading-[normal]">Subscription Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[8px] whitespace-nowrap">
        <p className="leading-[8px]"></p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative w-full">
          <Container3 />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] whitespace-nowrap">
            <p className="leading-[normal]">Catalog</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[8px] whitespace-nowrap">
        <p className="leading-[8px]"></p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative w-full">
          <Container4 />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] whitespace-nowrap">
            <p className="leading-[normal]">Pricing Configuration</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[8px] whitespace-nowrap">
        <p className="leading-[8px]"></p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative w-full">
          <Container5 />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] whitespace-nowrap">
            <p className="leading-[normal]">AI Demand Forecasting</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[8px] whitespace-nowrap">
        <p className="leading-[8px]"></p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative w-full">
          <Container6 />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] whitespace-nowrap">
            <p className="leading-[normal]">Orders Logistics</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[8px] whitespace-nowrap">
        <p className="leading-[8px]"></p>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative w-full">
          <Container7 />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] whitespace-nowrap">
            <p className="leading-[normal]">Pending Registrations</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Nav">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start px-[16px] py-[24px] relative size-full">
        <Link />
        <Link1 />
        <Link2 />
        <Link3 />
        <Link4 />
        <Link5 />
        <Link6 />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-0 size-[31.993px] top-0" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.9931 31.9931">
        <g clipPath="url(#clip0_36_1415)" id="Icon">
          <path d={svgPaths.p266cec00} fill="var(--fill-0, #D1D5DC)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_36_1415">
            <rect fill="white" height="31.9931" width="31.9931" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute bg-[#f3f4f6] left-0 overflow-clip rounded-[24234400px] size-[31.993px] top-0" data-name="Text">
      <Icon />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[19.997px] left-0 top-0 w-[116.958px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[0.44px] tracking-[-0.1504px] whitespace-nowrap">Valu$ 6767</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[15.991px] left-0 top-[20px] w-[116.958px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#155dfc] text-[12px] top-[0.72px] whitespace-nowrap">Trade Prime</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute h-[35.988px] left-[43.99px] top-[1.33px] w-[116.958px]" data-name="Container">
      <Paragraph />
      <Paragraph1 />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[38.663px] relative shrink-0 w-full" data-name="Container">
      <Text />
      <Container10 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-0 size-[19.997px] top-0" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9971 19.9971">
        <g id="Icon">
          <path d={svgPaths.p2f1ee400} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66642" />
          <path d={svgPaths.p5ead450} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66642" />
          <path d="M17.4974 9.99854H7.4989" id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66642" />
        </g>
      </svg>
    </div>
  );
}

function Link7() {
  return (
    <div className="h-[19.997px] relative shrink-0 w-full" data-name="Link">
      <Icon1 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[31.99px] not-italic text-[#4a5565] text-[14px] top-[0.44px] tracking-[-0.1504px] whitespace-nowrap">Sign Out</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[107.354px] relative shrink-0 w-[255.267px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t-[0.722px] inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[15.991px] items-start pt-[16.713px] px-[15.991px] relative size-full">
        <Container9 />
        <Link7 />
      </div>
    </div>
  );
}

function AsideSidebar() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[1228px] items-start left-0 pr-px top-0 w-[250px]" data-name="Aside - SIDEBAR">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-r border-solid inset-0 pointer-events-none" />
      <HorizontalBorder />
      <Nav />
      <Container8 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[24px] whitespace-nowrap">
        <p className="leading-[normal]">Welcome back Valu$ 6767</p>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute content-stretch flex items-center left-[32.5px] right-[1673.5px] top-[32px]" data-name="Header">
      <Heading />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] w-full">
        <p className="leading-[normal]">Total Revenue (MTD)</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[28px] w-full">
        <p className="leading-[normal]">$1.67M</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#10b981] text-[13px] whitespace-nowrap">
        <p className="leading-[13px]"></p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#10b981] text-[13px] whitespace-nowrap">
        <p className="leading-[normal]">+67% vs last month</p>
      </div>
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" data-name="Background+Shadow">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[24px] relative size-full">
        <Container11 />
        <Container12 />
        <Container13 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] w-full">
        <p className="leading-[normal]">Orders Today</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[28px] w-full">
        <p className="leading-[normal]">1,267</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#10b981] text-[13px] whitespace-nowrap">
        <p className="leading-[13px]"></p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Container">
      <Container18 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#10b981] text-[13px] whitespace-nowrap">
        <p className="leading-[normal]">+6.7% vs yesterday</p>
      </div>
    </div>
  );
}

function BackgroundShadow1() {
  return (
    <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" data-name="Background+Shadow">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[24px] relative size-full">
        <Container15 />
        <Container16 />
        <Container17 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] w-full">
        <p className="leading-[normal]">Items Sold</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[28px] w-full">
        <p className="leading-[normal]">45,676</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#10b981] text-[13px] whitespace-nowrap">
        <p className="leading-[13px]"></p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Container">
      <Container22 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#10b981] text-[13px] whitespace-nowrap">
        <p className="leading-[normal]">+15.2% vs last week</p>
      </div>
    </div>
  );
}

function BackgroundShadow2() {
  return (
    <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" data-name="Background+Shadow">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[24px] relative size-full">
        <Container19 />
        <Container20 />
        <Container21 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ef4444] text-[20px] whitespace-nowrap">
        <p className="leading-[20px]"></p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#fee2e2] content-stretch flex items-center justify-center relative rounded-[24px] shrink-0 size-[48px]" data-name="Background">
      <Container24 />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">Low Stock Alerts</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#ef4444] text-[28px] whitespace-nowrap">
        <p className="leading-[normal]">23 Items</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[120px]" data-name="Container">
      <Container26 />
      <Container27 />
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative w-full">
        <Background1 />
        <Container25 />
      </div>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[12px]" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#fee2e2] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col items-start p-[25px] relative size-full">
        <Container23 />
      </div>
    </div>
  );
}

function KpiCardsRow() {
  return (
    <div className="absolute content-stretch flex gap-[24px] h-[167px] items-start justify-center left-[32px] right-[32px] top-[93px]" data-name="KPI Cards Row">
      <BackgroundShadow />
      <BackgroundShadow1 />
      <BackgroundShadow2 />
      <BackgroundBorderShadow />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[16px] whitespace-nowrap">
        <p className="leading-[normal]">Top Selling Products For This Month</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] whitespace-nowrap">
        <p className="leading-[normal]">Last 30 Days — Core indicator for AI restocking forecast</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[320px]" data-name="Container">
      <Heading1 />
      <Container30 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[20px] text-center whitespace-nowrap">
        <p className="leading-[20px]"></p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center pb-[2px] pt-[1.5px] relative shrink-0" data-name="Button">
      <Container31 />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex gap-[1103.47px] items-center relative shrink-0 w-full" data-name="Container">
      <Container29 />
      <Button />
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-end overflow-clip relative shrink-0 w-[120px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[13px] text-right whitespace-nowrap">
        <p className="leading-[normal]">Rice 25kg Premium</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-white whitespace-nowrap">
        <p className="leading-[normal]">12,450</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-gradient-to-r flex-[1_0_0] from-[#fff0e5] min-h-px min-w-px relative rounded-[4px] to-[#f26522] w-full" data-name="Background">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end pr-[8px] relative size-full">
          <Container35 />
        </div>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#f5f7fa] content-stretch flex flex-[1_0_0] flex-col h-[24px] items-start justify-center min-h-px min-w-px overflow-clip relative rounded-[4px]" data-name="Background">
      <Background3 />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Container34 />
      <Background2 />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-end overflow-clip relative shrink-0 w-[120px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[13px] text-right whitespace-nowrap">
        <p className="leading-[normal]">Cooking Oil 5L</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-white whitespace-nowrap">
        <p className="leading-[normal]">10,240</p>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-gradient-to-r content-stretch flex flex-[1_0_0] from-[#fff0e5] items-center justify-end min-h-px min-w-px pr-[8px] relative rounded-[4px] to-[#f26522] w-[1098.19px]" data-name="Background">
      <Container38 />
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#f5f7fa] content-stretch flex flex-[1_0_0] flex-col h-[24px] items-start justify-center min-h-px min-w-px overflow-clip relative rounded-[4px]" data-name="Background">
      <Background5 />
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Container37 />
      <Background4 />
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-end overflow-clip relative shrink-0 w-[120px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[13px] text-right whitespace-nowrap">
        <p className="leading-[normal]">Canned Sardines …</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-white whitespace-nowrap">
        <p className="leading-[normal]">8,105</p>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-gradient-to-r content-stretch flex flex-[1_0_0] from-[#fff0e5] items-center justify-end min-h-px min-w-px pr-[8px] relative rounded-[4px] to-[#f26522] w-[839.8px]" data-name="Background">
      <Container41 />
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#f5f7fa] content-stretch flex flex-[1_0_0] flex-col h-[24px] items-start justify-center min-h-px min-w-px overflow-clip relative rounded-[4px]" data-name="Background">
      <Background7 />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Container40 />
      <Background6 />
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-end overflow-clip relative shrink-0 w-[120px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[13px] text-right whitespace-nowrap">
        <p className="leading-[normal]">Sugar 1kg Bundle</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-white whitespace-nowrap">
        <p className="leading-[normal]">6,890</p>
      </div>
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-gradient-to-r content-stretch flex flex-[1_0_0] from-[#fff0e5] items-center justify-end min-h-px min-w-px pr-[8px] relative rounded-[4px] to-[#f26522] w-[710.59px]" data-name="Background">
      <Container44 />
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#f5f7fa] content-stretch flex flex-[1_0_0] flex-col h-[24px] items-start justify-center min-h-px min-w-px overflow-clip relative rounded-[4px]" data-name="Background">
      <Background9 />
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Container43 />
      <Background8 />
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-end overflow-clip pr-[8.91px] relative shrink-0 w-[120px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[13px] text-right whitespace-nowrap">
        <p className="leading-[normal]">Instant Noodles …</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-white whitespace-nowrap">
        <p className="leading-[normal]">5,600</p>
      </div>
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-gradient-to-r content-stretch flex flex-[1_0_0] from-[#fff0e5] items-center justify-end min-h-px min-w-px pr-[8px] relative rounded-[4px] to-[#f26522] w-[581.39px]" data-name="Background">
      <Container47 />
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-[#f5f7fa] content-stretch flex flex-[1_0_0] flex-col h-[24px] items-start justify-center min-h-px min-w-px overflow-clip relative rounded-[4px]" data-name="Background">
      <Background11 />
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Container46 />
      <Background10 />
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col items-end overflow-clip relative shrink-0 w-[120px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[13px] text-right whitespace-nowrap">
        <p className="leading-[normal]">Soy Sauce 1L</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-white whitespace-nowrap">
        <p className="leading-[normal]">3,120</p>
      </div>
    </div>
  );
}

function Background13() {
  return (
    <div className="bg-gradient-to-r content-stretch flex flex-[1_0_0] from-[#fff0e5] items-center justify-end min-h-px min-w-px pr-[8px] relative rounded-[4px] to-[#f26522] w-[323px]" data-name="Background">
      <Container50 />
    </div>
  );
}

function Background12() {
  return (
    <div className="bg-[#f5f7fa] content-stretch flex flex-[1_0_0] flex-col h-[24px] items-start justify-center min-h-px min-w-px overflow-clip relative rounded-[4px]" data-name="Background">
      <Background13 />
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Container49 />
      <Background12 />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col gap-[21.2px] h-[250px] items-start relative shrink-0 w-full" data-name="Container">
      <Container33 />
      <Container36 />
      <Container39 />
      <Container42 />
      <Container45 />
      <Container48 />
    </div>
  );
}

function TopSellingChart() {
  return (
    <div className="bg-white h-full relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-[1476px]" data-name="Top Selling Chart">
      <div className="content-stretch flex flex-col gap-[20px] items-start p-[24px] relative size-full">
        <Container28 />
        <Container32 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[16px] w-full">
        <p className="leading-[normal]">Quick Actions</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Heading2 />
    </div>
  );
}

function Container53() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[24px] whitespace-nowrap">
          <p className="leading-[24px]"></p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col gap-[12px] inset-[0_353px_204px_0] items-center p-[17px] rounded-[8px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container53 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#333] text-[13px] text-center whitespace-nowrap">
        <p className="leading-[normal]">New Product</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[24px] whitespace-nowrap">
          <p className="leading-[24px]"></p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col gap-[12px] inset-[0_0_204px_353px] items-center p-[17px] rounded-[8px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container54 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#333] text-[13px] text-center whitespace-nowrap">
        <p className="leading-[normal]">Update Pricing</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[24px] whitespace-nowrap">
          <p className="leading-[24px]"></p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col gap-[12px] inset-[102px_353px_102px_0] items-center p-[17px] rounded-[8px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container55 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#333] text-[13px] text-center whitespace-nowrap">
        <p className="leading-[normal]">Process Orders</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[24px] whitespace-nowrap">
          <p className="leading-[24px]"></p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col gap-[12px] inset-[102px_0_102px_353px] items-center p-[17px] rounded-[8px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container56 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#333] text-[13px] text-center whitespace-nowrap">
        <p className="leading-[normal]">View Forecasts</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[24px] whitespace-nowrap">
          <p className="leading-[24px]"></p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col gap-[12px] inset-[204px_353px_0_0] items-center p-[17px] rounded-[8px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container57 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#333] text-[13px] text-center whitespace-nowrap">
        <p className="leading-[normal]">Export Report</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[24px] whitespace-nowrap">
          <p className="leading-[24px]"></p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder5() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col gap-[12px] inset-[204px_0_0_353px] items-center p-[17px] rounded-[8px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container58 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#333] text-[13px] text-center whitespace-nowrap">
        <p className="leading-[normal]">Order History</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="h-[290px] relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder />
      <BackgroundBorder1 />
      <BackgroundBorder2 />
      <BackgroundBorder3 />
      <BackgroundBorder4 />
      <BackgroundBorder5 />
    </div>
  );
}

function QuickActions() {
  return (
    <div className="bg-white h-full relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-[738px]" data-name="Quick Actions">
      <div className="content-stretch flex flex-col gap-[20px] items-start p-[24px] relative size-full">
        <Container51 />
        <Container52 />
      </div>
    </div>
  );
}

function Row2ChartsAndActions() {
  return (
    <div className="absolute content-stretch flex gap-[24px] h-[479px] items-start justify-center left-[32px] right-[32px] top-[301px]" data-name="Row 2: Charts and Actions">
      <TopSellingChart />
      <QuickActions />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[16px] whitespace-nowrap">
        <p className="leading-[normal]">Priority Restock Alerts</p>
      </div>
    </div>
  );
}

function Link8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f26522] text-[13px] whitespace-nowrap">
        <p className="leading-[normal]">View All (23)</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading3 />
      <Link8 />
    </div>
  );
}

function Cell() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[13px] pt-[12px] px-[16px] relative shrink-0 w-[428.95px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
        <p className="leading-[normal]">Product Name</p>
      </div>
    </div>
  );
}

function Cell1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[13px] pt-[12px] px-[16px] relative shrink-0 w-[304.75px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
        <p className="leading-[normal]">Current Stock</p>
      </div>
    </div>
  );
}

function Cell2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[13px] pt-[12px] px-[16px] relative shrink-0 w-[474.36px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
        <p className="leading-[normal]">Forecast Demand (7 Days)</p>
      </div>
    </div>
  );
}

function Cell3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[13px] pt-[12px] px-[16px] relative shrink-0 w-[219.94px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
        <p className="leading-[normal]">Action</p>
      </div>
    </div>
  );
}

function HeaderRow() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Header → Row">
      <Cell />
      <Cell1 />
      <Cell2 />
      <Cell3 />
    </div>
  );
}

function Data() {
  return (
    <div className="h-[50px] relative shrink-0 w-[428.95px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="absolute bg-[#ef4444] left-[16px] rounded-[4px] size-[8px] top-[22.5px]" data-name="Background" />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[17px] justify-center leading-[0] left-[32px] not-italic text-[#333] text-[14px] top-[25px] w-[96.879px]">
        <p className="leading-[normal]">Cooking Oil 5L</p>
      </div>
    </div>
  );
}

function Data1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[304.75px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#ef4444] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">145 units</p>
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[474.36px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#333] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">1,200 units</p>
      </div>
    </div>
  );
}

function Link9() {
  return (
    <div className="relative shrink-0" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f26522] text-[13px] whitespace-nowrap">
          <p className="leading-[normal]">Draft PO</p>
        </div>
      </div>
    </div>
  );
}

function Data3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.5px] pt-[17.5px] px-[16px] relative shrink-0 w-[219.94px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Link9 />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data />
      <Data1 />
      <Data2 />
      <Data3 />
    </div>
  );
}

function Data4() {
  return (
    <div className="h-[50px] relative shrink-0 w-[428.95px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="absolute bg-[#ef4444] left-[16px] rounded-[4px] size-[8px] top-[22.5px]" data-name="Background" />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[17px] justify-center leading-[0] left-[32px] not-italic text-[#333] text-[14px] top-[25px] w-[127.978px]">
        <p className="leading-[normal]">Rice 25kg Premium</p>
      </div>
    </div>
  );
}

function Data5() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[304.75px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#ef4444] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">210 units</p>
      </div>
    </div>
  );
}

function Data6() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[474.36px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#333] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">850 units</p>
      </div>
    </div>
  );
}

function Link10() {
  return (
    <div className="relative shrink-0" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f26522] text-[13px] whitespace-nowrap">
          <p className="leading-[normal]">Draft PO</p>
        </div>
      </div>
    </div>
  );
}

function Data7() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.5px] pt-[17.5px] px-[16px] relative shrink-0 w-[219.94px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Link10 />
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data4 />
      <Data5 />
      <Data6 />
      <Data7 />
    </div>
  );
}

function Data8() {
  return (
    <div className="h-[50px] relative shrink-0 w-[428.95px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="absolute bg-[#f59e0b] left-[16px] rounded-[4px] size-[8px] top-[22.5px]" data-name="Background" />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[17px] justify-center leading-[0] left-[32px] not-italic text-[#333] text-[14px] top-[25px] w-[153.463px]">
        <p className="leading-[normal]">Instant Noodles Carton</p>
      </div>
    </div>
  );
}

function Data9() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[304.75px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#f59e0b] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">450 units</p>
      </div>
    </div>
  );
}

function Data10() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[474.36px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#333] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">600 units</p>
      </div>
    </div>
  );
}

function Link11() {
  return (
    <div className="relative shrink-0" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f26522] text-[13px] whitespace-nowrap">
          <p className="leading-[normal]">Auto-Order</p>
        </div>
      </div>
    </div>
  );
}

function Data11() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.5px] pt-[17.5px] px-[16px] relative shrink-0 w-[219.94px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Link11 />
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data8 />
      <Data9 />
      <Data10 />
      <Data11 />
    </div>
  );
}

function Data12() {
  return (
    <div className="h-[49.5px] relative shrink-0 w-[428.95px]" data-name="Data">
      <div className="absolute bg-[#f59e0b] left-[16px] rounded-[4px] size-[8px] top-[22.5px]" data-name="Background" />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[17px] justify-center leading-[0] left-[32px] not-italic text-[#333] text-[14px] top-[25px] w-[109.339px]">
        <p className="leading-[normal]">Flour 1kg Bundle</p>
      </div>
    </div>
  );
}

function Data13() {
  return (
    <div className="content-stretch flex flex-col items-start p-[16px] relative shrink-0 w-[304.75px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#f59e0b] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">320 units</p>
      </div>
    </div>
  );
}

function Data14() {
  return (
    <div className="content-stretch flex flex-col items-start p-[16px] relative shrink-0 w-[474.36px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#333] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">400 units</p>
      </div>
    </div>
  );
}

function Link12() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f26522] text-[13px] whitespace-nowrap">
        <p className="leading-[normal]">Draft PO</p>
      </div>
    </div>
  );
}

function Data15() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] pt-[17.5px] px-[16px] relative shrink-0 w-[219.94px]" data-name="Data">
      <Link12 />
    </div>
  );
}

function Row3() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data12 />
      <Data13 />
      <Data14 />
      <Data15 />
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Body">
      <Row />
      <Row1 />
      <Row2 />
      <Row3 />
    </div>
  );
}

function Table() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table">
      <HeaderRow />
      <Body />
    </div>
  );
}

function StockReplenishment() {
  return (
    <div className="bg-white h-full relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-[1476px]" data-name="Stock Replenishment">
      <div className="content-stretch flex flex-col gap-[20px] items-start p-[24px] relative size-full">
        <Container59 />
        <Table />
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex flex-col items-center min-w-[36px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f26522] text-[32px] text-center whitespace-nowrap">
        <p className="leading-[32px]"></p>
      </div>
    </div>
  );
}

function Background14() {
  return (
    <div className="bg-[#fff0e5] content-stretch flex items-center justify-center relative rounded-[40px] shrink-0 size-[80px]" data-name="Background">
      <Container60 />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col h-[96px] items-start pb-[16px] relative shrink-0 w-[80px]" data-name="Margin">
      <Background14 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[normal]">Run AI Demand Forecast</p>
      </div>
    </div>
  );
}

function Heading2Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0" data-name="Heading 2:margin">
      <Heading4 />
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[13px] text-center whitespace-nowrap">
        <p className="leading-[normal]">Generate predictive ordering suggestions based on recent sales velocity and seasonal trends.</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[24px] relative shrink-0" data-name="Margin">
      <Container61 />
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
        <p className="leading-[14px]"></p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#1b2a4a] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[20px] py-[10px] relative w-full">
          <Container62 />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
            <p className="leading-[normal]">Generate Forecast</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundShadow3() {
  return (
    <div className="bg-white h-full relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-[738px]" data-name="Background+Shadow">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <Margin />
          <Heading2Margin />
          <Margin1 />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function Row3StockNeedsAndRecentOrders() {
  return (
    <div className="absolute content-stretch flex gap-[24px] h-[416px] items-start justify-center left-[32px] right-[32px] top-[812px]" data-name="Row 3: Stock Needs and Recent Orders">
      <StockReplenishment />
      <BackgroundShadow3 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex gap-[8px] items-center leading-[0] left-0 not-italic text-[#6b7280] text-[14px] top-1/2 whitespace-nowrap" data-name="Paragraph">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Regular',sans-serif] justify-center relative shrink-0">
        <p className="leading-[14px]"></p>
      </div>
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center relative shrink-0">
        <p className="leading-[normal]">{` March 21, 2026`}</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[20px] text-center whitespace-nowrap">
        <p className="leading-[20px]"></p>
      </div>
    </div>
  );
}

function BackgroundBorder6() {
  return (
    <div className="absolute bg-[#f26522] content-stretch flex items-center justify-center p-[2px] right-[-4px] rounded-[8px] size-[16px] top-[-4px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#f5f7fa] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white whitespace-nowrap">
        <p className="leading-[normal]">3</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-center justify-center left-[148px] pb-[2px] pt-[1.5px] top-1/2" data-name="Button">
      <Container64 />
      <BackgroundBorder6 />
    </div>
  );
}

function Container63() {
  return (
    <div className="absolute h-[23.5px] left-[2106.5px] top-[37px] w-[166px]" data-name="Container">
      <Paragraph2 />
      <Button2 />
    </div>
  );
}

function MainMainContent() {
  return (
    <div className="h-full relative shrink-0 w-[2307px]" data-name="Main - MAIN CONTENT">
      <Header />
      <KpiCardsRow />
      <Row2ChartsAndActions />
      <Row3StockNeedsAndRecentOrders />
      <Container63 />
    </div>
  );
}

export default function Admin() {
  return (
    <div className="content-stretch flex items-start justify-center pl-[250px] relative size-full" data-name="/admin" style={{ backgroundImage: "linear-gradient(90deg, rgb(245, 247, 250) 0%, rgb(245, 247, 250) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <AsideSidebar />
      <MainMainContent />
    </div>
  );
}