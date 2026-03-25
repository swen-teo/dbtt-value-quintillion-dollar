import svgPaths from "./svg-9g55d25fdf";
import imgValuLogo from "figma:asset/c3ab63eed27f5bedc7c4f904845cb0164a78399e.png";

function ValuLogo() {
  return (
    <div className="max-w-[37.9900016784668px] relative shrink-0 size-[30px]" data-name="Valu$ Logo">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgValuLogo} />
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center overflow-clip relative rounded-[19px] shrink-0 size-[37.99px]" data-name="Background">
      <ValuLogo />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-white tracking-[-0.2px] whitespace-nowrap">
        <p className="leading-[25.5px]">Valu$ Wholesale</p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="absolute bg-[#f57c00] content-stretch flex gap-[10px] h-[73.99px] items-center left-0 px-[20px] py-[18px] right-[0.56px] top-0" data-name="Background">
      <Background1 />
      <Container />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-center relative shrink-0 w-[21.97px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">👤</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">Account</p>
      </div>
    </div>
  );
}

function ItemLink() {
  return (
    <div className="relative rounded-[6px] shrink-0 w-full" data-name="Item → Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[11.01px] items-center pl-[13.01px] pr-[113.41px] py-[12px] relative w-full">
          <Container1 />
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-center relative shrink-0 w-[21.97px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">💳</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">Subscription</p>
      </div>
    </div>
  );
}

function ItemLink1() {
  return (
    <div className="relative rounded-[6px] shrink-0 w-full" data-name="Item → Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[11.01px] items-center pl-[13.01px] pr-[84.84px] py-[12px] relative w-full">
          <Container3 />
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-center relative shrink-0 w-[21.97px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">⚡</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">Quick Order</p>
      </div>
    </div>
  );
}

function ItemLink2() {
  return (
    <div className="relative rounded-[6px] shrink-0 w-full" data-name="Item → Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[11.01px] items-center pl-[13.01px] pr-[88.94px] py-[12px] relative w-full">
          <Container5 />
          <Container6 />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-center relative shrink-0 w-[21.97px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">🛒</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">Cart</p>
      </div>
    </div>
  );
}

function ItemLink3() {
  return (
    <div className="relative rounded-[6px] shrink-0 w-full" data-name="Item → Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[11.01px] items-center pl-[13.01px] pr-[140.82px] py-[12px] relative w-full">
          <Container7 />
          <Container8 />
        </div>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-center relative shrink-0 w-[21.97px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#f57c00] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">📦</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#f57c00] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">My Orders</p>
      </div>
    </div>
  );
}

function ItemLink4() {
  return (
    <div className="bg-[#fff3e0] relative rounded-[6px] shrink-0 w-full" data-name="Item → Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[11.01px] items-center pl-[13.01px] pr-[98.38px] py-[12px] relative w-full">
          <Container9 />
          <Container10 />
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-center relative shrink-0 w-[21.97px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">🎁</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">{`Credits & Rewards`}</p>
      </div>
    </div>
  );
}

function ItemLink5() {
  return (
    <div className="relative rounded-[6px] shrink-0 w-full" data-name="Item → Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[11.01px] items-center pl-[13.01px] pr-[47.09px] py-[12px] relative w-full">
          <Container11 />
          <Container12 />
        </div>
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] items-start left-0 pb-[275.48px] pt-[16px] px-[12px] right-[0.56px] top-[73.99px]" data-name="List">
      <ItemLink />
      <ItemLink1 />
      <ItemLink2 />
      <ItemLink3 />
      <ItemLink4 />
      <ItemLink5 />
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#f5f6fa] content-stretch flex items-center justify-center p-px relative rounded-[17px] shrink-0 size-[33.99px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#d1d5de] border-solid inset-0 pointer-events-none rounded-[17px]" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[13px] text-center whitespace-nowrap">
        <p className="leading-[19.5px]">MS</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.725px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[13px] whitespace-nowrap">
        <p className="leading-[19.5px]">Mama Shop #493</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.725px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f57c00] text-[11px] whitespace-nowrap">
        <p className="leading-[16.5px]">Trade Prime</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.725px] relative shrink-0 w-[112px]" data-name="Container">
      <Container15 />
      <Container16 />
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-center relative w-full">
        <BackgroundBorder />
        <Container14 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[15px] whitespace-nowrap">
        <p className="leading-[22.5px]">↪</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pb-[6px] pt-[5.325px] relative w-full">
        <Container17 />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[0px] whitespace-nowrap">
          <p className="leading-[19.5px] text-[13px]">Sign Out</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[9px] pb-[20px] pt-[16.556px] px-[16px] right-[-8.44px] top-[1299px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-solid border-t-[0.556px] inset-0 pointer-events-none" />
      <Container13 />
      <Link />
    </div>
  );
}

function NavSidebar() {
  return (
    <div className="absolute bg-white h-[1418px] left-0 min-h-[764.4439697265625px] top-0 w-[240px]" data-name="Nav - SIDEBAR">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-r-[0.556px] border-solid inset-0 pointer-events-none" />
      <Background />
      <List />
      <HorizontalBorder />
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[13px] whitespace-nowrap">
        <p className="leading-[19.5px]">Account</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#a0a8b9] text-[13px] whitespace-nowrap">
        <p className="leading-[19.5px]">›</p>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[18px] whitespace-nowrap">
        <p className="leading-[27px]">My Orders</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
        <Link1 />
        <Container20 />
        <Heading />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[13px] whitespace-nowrap">
        <p className="leading-[19.5px]">March 22, 2026</p>
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#f5f6fa] content-stretch flex items-center justify-center pb-[6.995px] pt-[5.995px] px-px relative rounded-[17px] shrink-0 size-[33.99px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#d1d5de] border-solid inset-0 pointer-events-none rounded-[17px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[21px]">👤</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative">
        <Container22 />
        <BackgroundBorder1 />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white h-[63.99px] shrink-0 sticky top-0 w-full z-[2]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[0.556px] px-[32px] relative size-full">
          <Container19 />
          <Container21 />
        </div>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[23.99px] right-[23.99px] top-[24.77px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[12px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[18px]">Total Orders</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[23.99px] right-[23.99px] top-[50.15px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[28px] whitespace-nowrap">
        <p className="leading-[33.6px]">87</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[23.99px] right-[23.99px] top-[90.36px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Since Jan 2025</p>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorderShadow() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-[200px] relative rounded-[10px] self-stretch" data-name="Background+HorizontalBorder+Shadow">
      <div aria-hidden="true" className="absolute border-[#1565c0] border-solid border-t-[2.778px] inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)]" />
      <Container23 />
      <Container24 />
      <Container25 />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[23.99px] right-[23.99px] top-[24.77px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[12px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[18px]">Pending</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[23.99px] right-[23.99px] top-[50.15px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[28px] whitespace-nowrap">
        <p className="leading-[33.6px]">2</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[23.99px] right-[23.99px] top-[90.36px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Awaiting confirmation</p>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorderShadow1() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-[200px] relative rounded-[10px] self-stretch" data-name="Background+HorizontalBorder+Shadow">
      <div aria-hidden="true" className="absolute border-[#f57c00] border-solid border-t-[2.778px] inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)]" />
      <Container26 />
      <Container27 />
      <Container28 />
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[24px] right-[23.98px] top-[24.77px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[12px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[18px]">Ready for Pickup</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[24px] right-[23.98px] top-[50.15px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[28px] whitespace-nowrap">
        <p className="leading-[33.6px]">3</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[24px] right-[23.98px] top-[90.36px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Awaiting collection</p>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorderShadow2() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-[200px] relative rounded-[10px] self-stretch" data-name="Background+HorizontalBorder+Shadow">
      <div aria-hidden="true" className="absolute border-[#7b1fa2] border-solid border-t-[2.778px] inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)]" />
      <Container29 />
      <Container30 />
      <Container31 />
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[23.99px] right-[23.99px] top-[24.77px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[12px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[18px]">Collected</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[23.99px] right-[23.99px] top-[50.15px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[28px] whitespace-nowrap">
        <p className="leading-[33.6px]">82</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[23.99px] right-[23.99px] top-[90.36px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#2e7d32] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">94.2% on schedule</p>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorderShadow3() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-[200px] relative rounded-[10px] self-stretch" data-name="Background+HorizontalBorder+Shadow">
      <div aria-hidden="true" className="absolute border-[#2e7d32] border-solid border-t-[2.778px] inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)]" />
      <Container32 />
      <Container33 />
      <Container34 />
    </div>
  );
}

function SummaryCards() {
  return (
    <div className="absolute content-stretch flex flex-wrap gap-[0px_20px] h-[130.36px] items-start justify-center left-[32px] right-[31.99px] top-[28px]" data-name="Summary Cards">
      <BackgroundHorizontalBorderShadow />
      <BackgroundHorizontalBorderShadow1 />
      <BackgroundHorizontalBorderShadow2 />
      <BackgroundHorizontalBorderShadow3 />
    </div>
  );
}

function Container35() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[16px] whitespace-nowrap">
          <p className="leading-[24px]">Latest Order — ORD-4832</p>
        </div>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#fff3e0] relative rounded-[20px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[3.625px] pt-[3.605px] px-[12px] relative">
        <div className="capitalize flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#f57c00] text-[11.5px] whitespace-nowrap">
          <p className="leading-[17.25px]">Pending</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[16.556px] pl-[23.99px] pr-[24px] pt-[20px] relative w-full">
          <Container35 />
          <Background2 />
        </div>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[13px] w-full">
        <p className="leading-[19.5px]">12 items · $2,450.00 · Placed Mar 22, 2026</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#2e7d32] content-stretch flex items-center justify-center mb-[-0.01px] pb-[6.925px] pt-[6.075px] relative rounded-[18px] shrink-0 size-[36px] z-[3]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-center text-white whitespace-nowrap">
        <p className="leading-[22.5px]">✓</p>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col gap-[1.055px] items-center leading-[0] not-italic relative shrink-0 text-center whitespace-nowrap" data-name="Paragraph">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center relative shrink-0 text-[#1b2a4a] text-[12px]">
        <p className="leading-[18px]">Placed</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#6b7385] text-[11px]">
        <p className="leading-[16.5px]">Mar 22</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.01px] pt-[10px] relative shrink-0 z-[1]" data-name="Margin">
      <Paragraph />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col isolate items-center pb-[0.01px] relative shrink-0 w-[244.49px]" data-name="Container">
      <Background3 />
      <div className="absolute bg-[#2e7d32] h-[2.99px] left-1/2 right-[-50%] top-[17.99px] z-[2]" data-name="Background" />
      <Margin />
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#f57c00] content-stretch flex items-center justify-center mb-[-0.01px] pb-[6.925px] pt-[6.075px] relative rounded-[18px] shrink-0 size-[36px] z-[3]" data-name="Background">
      <div className="-translate-x-1/2 absolute bg-[rgba(255,255,255,0)] left-1/2 rounded-[18px] shadow-[0px_0px_0px_4px_#fff3e0] size-[36px] top-0" data-name="Overlay+Shadow" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-center text-white whitespace-nowrap">
        <p className="leading-[22.5px]">●</p>
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex flex-col gap-[1.055px] items-center leading-[0] not-italic relative shrink-0 text-center whitespace-nowrap" data-name="Paragraph">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center relative shrink-0 text-[#1b2a4a] text-[12px]">
        <p className="leading-[18px]">Confirmed</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#6b7385] text-[11px]">
        <p className="leading-[16.5px]">Pending</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.01px] pt-[10px] relative shrink-0 z-[1]" data-name="Margin">
      <Paragraph1 />
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col isolate items-center pb-[0.01px] relative shrink-0 w-[244.5px]" data-name="Container">
      <Background4 />
      <div className="absolute bg-[#eaedf3] h-[2.99px] left-1/2 right-[-50%] top-[17.99px] z-[2]" data-name="Background" />
      <Margin1 />
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#eaedf3] content-stretch flex items-center justify-center mb-[-0.01px] pb-[6.925px] pt-[6.075px] relative rounded-[18px] shrink-0 size-[36px] z-[3]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#a0a8b9] text-[15px] text-center whitespace-nowrap">
        <p className="leading-[22.5px]">3</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[12px] text-center whitespace-nowrap">
        <p className="leading-[18px]">Packed</p>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.01px] pt-[10px] relative shrink-0 z-[1]" data-name="Margin">
      <Container42 />
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col isolate items-center pb-[0.01px] relative shrink-0 w-[244.49px]" data-name="Container">
      <Background5 />
      <div className="absolute bg-[#eaedf3] h-[2.99px] left-1/2 right-[-50%] top-[17.99px] z-[2]" data-name="Background" />
      <Margin2 />
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#eaedf3] content-stretch flex items-center justify-center mb-[-0.01px] pb-[6.925px] pt-[6.075px] relative rounded-[18px] shrink-0 size-[36px] z-[3]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#a0a8b9] text-[15px] text-center whitespace-nowrap">
        <p className="leading-[22.5px]">4</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[12px] text-center whitespace-nowrap">
        <p className="leading-[18px]">Ready</p>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.01px] pt-[10px] relative shrink-0 z-[1]" data-name="Margin">
      <Container44 />
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col isolate items-center pb-[0.01px] relative shrink-0 w-[244.5px]" data-name="Container">
      <Background6 />
      <div className="absolute bg-[#eaedf3] h-[2.99px] left-1/2 right-[-50%] top-[17.99px] z-[2]" data-name="Background" />
      <Margin3 />
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#eaedf3] content-stretch flex items-center justify-center mb-[-0.01px] pb-[6.925px] pt-[6.075px] relative rounded-[18px] shrink-0 size-[36px] z-[2]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#a0a8b9] text-[15px] text-center whitespace-nowrap">
        <p className="leading-[22.5px]">5</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[12px] text-center whitespace-nowrap">
        <p className="leading-[18px]">Collected</p>
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.01px] pt-[10px] relative shrink-0 z-[1]" data-name="Margin">
      <Container46 />
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col isolate items-center pb-[0.01px] relative shrink-0 w-[244.5px]" data-name="Container">
      <Background7 />
      <Margin4 />
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex items-start justify-between py-[8px] relative shrink-0 w-full" data-name="Container">
      <Container39 />
      <Container40 />
      <Container41 />
      <Container43 />
      <Container45 />
    </div>
  );
}

function Container36() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[15.99px] items-start px-[24px] py-[20px] relative w-full">
        <Container37 />
        <Container38 />
      </div>
    </div>
  );
}

function OrderStatusTracker() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[32px] right-[31.99px] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] top-[186.35px]" data-name="Order Status Tracker">
      <HorizontalBorder1 />
      <Container36 />
    </div>
  );
}

function Container47() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[16px] whitespace-nowrap">
          <p className="leading-[24px]">Active Orders</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder2() {
  return (
    <div className="mb-[-0.01px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[16.556px] pt-[20px] px-[24px] relative w-full">
          <Container47 />
        </div>
      </div>
    </div>
  );
}

function Cell() {
  return (
    <div className="bg-[#f5f6fa] content-stretch flex flex-col items-start pb-[12.485px] pt-[11.275px] px-[16px] relative shrink-0 w-[171.35px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[11px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[16.5px]">Order ID</p>
      </div>
    </div>
  );
}

function Cell1() {
  return (
    <div className="bg-[#f5f6fa] content-stretch flex flex-col items-start pb-[12.485px] pt-[11.275px] px-[16px] relative shrink-0 w-[197.83px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[11px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[16.5px]">Date</p>
      </div>
    </div>
  );
}

function Cell2() {
  return (
    <div className="bg-[#f5f6fa] content-stretch flex flex-col items-start pb-[12.485px] pt-[11.275px] px-[16px] relative shrink-0 w-[145.26px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[11px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[16.5px]">Items</p>
      </div>
    </div>
  );
}

function Cell3() {
  return (
    <div className="bg-[#f5f6fa] content-stretch flex flex-col items-start pb-[12.485px] pt-[11.275px] px-[16px] relative shrink-0 w-[171.48px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[11px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[16.5px]">Total</p>
      </div>
    </div>
  );
}

function Cell4() {
  return (
    <div className="bg-[#f5f6fa] content-stretch flex flex-col items-start pb-[12.485px] pt-[11.275px] px-[16px] relative shrink-0 w-[255.4px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[11px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[16.5px]">Status</p>
      </div>
    </div>
  );
}

function Cell5() {
  return (
    <div className="bg-[#f5f6fa] content-stretch flex flex-col items-start pb-[12.485px] pt-[11.275px] px-[16px] relative shrink-0 w-[160.45px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[11px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[16.5px]">Pickup By</p>
      </div>
    </div>
  );
}

function Cell6() {
  return (
    <div className="bg-[#f5f6fa] content-stretch flex flex-col items-start pb-[12.485px] pt-[11.275px] px-[16px] relative shrink-0 w-[168.67px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[11px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[16.5px]">Action</p>
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
      <Cell4 />
      <Cell5 />
      <Cell6 />
    </div>
  );
}

function Data() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[18.225px] pt-[17.975px] px-[16px] relative shrink-0 w-[171.35px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">ORD-4832</p>
      </div>
    </div>
  );
}

function Data1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[18.225px] pt-[17.975px] px-[16px] relative shrink-0 w-[197.83px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">Mar 22, 2026</p>
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[18.225px] pt-[17.975px] px-[16px] relative shrink-0 w-[145.26px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">12 items</p>
      </div>
    </div>
  );
}

function Data3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[18.225px] pt-[17.975px] px-[16px] relative shrink-0 w-[171.48px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">$2,450.00</p>
      </div>
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#fff3e0] relative rounded-[20px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-[3.625px] pt-[3.605px] px-[12px] relative">
        <div className="capitalize flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#f57c00] text-[11.5px] whitespace-nowrap">
          <p className="leading-[17.25px]">Pending</p>
        </div>
      </div>
    </div>
  );
}

function Data4() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15.99px] pt-[15.98px] px-[16px] relative shrink-0 w-[255.4px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <Background8 />
    </div>
  );
}

function Data5() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[18.225px] pt-[17.975px] px-[16px] relative shrink-0 w-[160.45px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">—</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5de] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[15.111px] py-[7.111px] relative">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[12px] text-center whitespace-nowrap">
          <p className="leading-[normal]">View</p>
        </div>
      </div>
    </div>
  );
}

function Data6() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[14.556px] pt-[14px] px-[16px] relative shrink-0 w-[168.67px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <Button />
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
      <Data4 />
      <Data5 />
      <Data6 />
    </div>
  );
}

function Data7() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[17.105px] pt-[16.875px] px-[16px] relative shrink-0 w-[171.35px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">ORD-4831</p>
      </div>
    </div>
  );
}

function Data8() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[17.105px] pt-[16.875px] px-[16px] relative shrink-0 w-[197.83px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">Mar 18, 2026</p>
      </div>
    </div>
  );
}

function Data9() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[17.105px] pt-[16.875px] px-[16px] relative shrink-0 w-[145.26px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">28 items</p>
      </div>
    </div>
  );
}

function Data10() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[17.105px] pt-[16.875px] px-[16px] relative shrink-0 w-[171.48px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">$5,120.00</p>
      </div>
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-[#e8f5e9] relative rounded-[20px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-[3.625px] pt-[3.605px] px-[12px] relative">
        <div className="capitalize flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#2e7d32] text-[11.5px] whitespace-nowrap">
          <p className="leading-[17.25px]">Ready for Pickup</p>
        </div>
      </div>
    </div>
  );
}

function Data11() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[14.88px] pt-[14.87px] px-[16px] relative shrink-0 w-[255.4px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <Background9 />
    </div>
  );
}

function Data12() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[17.105px] pt-[16.875px] px-[16px] relative shrink-0 w-[160.45px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">Mar 23</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#f57c00] relative rounded-[6px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[14px] py-[6px] relative">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">
          <p className="leading-[normal]">Collect</p>
        </div>
      </div>
    </div>
  );
}

function Data13() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[14.556px] pt-[14px] px-[16px] relative shrink-0 w-[168.67px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <Button1 />
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data7 />
      <Data8 />
      <Data9 />
      <Data10 />
      <Data11 />
      <Data12 />
      <Data13 />
    </div>
  );
}

function Data14() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[17.105px] pt-[16.875px] px-[16px] relative shrink-0 w-[171.35px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">ORD-4830</p>
      </div>
    </div>
  );
}

function Data15() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[17.105px] pt-[16.875px] px-[16px] relative shrink-0 w-[197.83px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">Mar 17, 2026</p>
      </div>
    </div>
  );
}

function Data16() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[17.105px] pt-[16.875px] px-[16px] relative shrink-0 w-[145.26px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">8 items</p>
      </div>
    </div>
  );
}

function Data17() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[17.105px] pt-[16.875px] px-[16px] relative shrink-0 w-[171.48px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">$1,860.00</p>
      </div>
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-[#e8f5e9] relative rounded-[20px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-[3.625px] pt-[3.605px] px-[12px] relative">
        <div className="capitalize flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#2e7d32] text-[11.5px] whitespace-nowrap">
          <p className="leading-[17.25px]">Ready for Pickup</p>
        </div>
      </div>
    </div>
  );
}

function Data18() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[14.88px] pt-[14.87px] px-[16px] relative shrink-0 w-[255.4px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <Background10 />
    </div>
  );
}

function Data19() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[17.105px] pt-[16.875px] px-[16px] relative shrink-0 w-[160.45px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">Mar 22</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#f57c00] relative rounded-[6px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[14px] py-[6px] relative">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">
          <p className="leading-[normal]">Track</p>
        </div>
      </div>
    </div>
  );
}

function Data20() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[14.556px] pt-[14px] px-[16px] relative shrink-0 w-[168.67px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <Button2 />
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data14 />
      <Data15 />
      <Data16 />
      <Data17 />
      <Data18 />
      <Data19 />
      <Data20 />
    </div>
  );
}

function Data21() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[18.225px] pt-[17.975px] px-[16px] relative shrink-0 w-[171.35px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">ORD-4829</p>
      </div>
    </div>
  );
}

function Data22() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[18.225px] pt-[17.975px] px-[16px] relative shrink-0 w-[197.83px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">Mar 16, 2026</p>
      </div>
    </div>
  );
}

function Data23() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[18.225px] pt-[17.975px] px-[16px] relative shrink-0 w-[145.26px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">6 items</p>
      </div>
    </div>
  );
}

function Data24() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[18.225px] pt-[17.975px] px-[16px] relative shrink-0 w-[171.48px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">$980.00</p>
      </div>
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-[#f3e5f5] relative rounded-[20px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-[3.625px] pt-[3.605px] px-[12px] relative">
        <div className="capitalize flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#7b1fa2] text-[11.5px] whitespace-nowrap">
          <p className="leading-[17.25px]">Packed</p>
        </div>
      </div>
    </div>
  );
}

function Data25() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15.99px] pt-[15.98px] px-[16px] relative shrink-0 w-[255.4px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <Background11 />
    </div>
  );
}

function Data26() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[18.225px] pt-[17.975px] px-[16px] relative shrink-0 w-[160.45px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">Mar 22</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5de] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[15.111px] py-[7.111px] relative">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[12px] text-center whitespace-nowrap">
          <p className="leading-[normal]">View</p>
        </div>
      </div>
    </div>
  );
}

function Data27() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[14.556px] pt-[14px] px-[16px] relative shrink-0 w-[168.67px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <Button3 />
    </div>
  );
}

function Row3() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data21 />
      <Data22 />
      <Data23 />
      <Data24 />
      <Data25 />
      <Data26 />
      <Data27 />
    </div>
  );
}

function Data28() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[17.945px] pt-[17.985px] px-[16px] relative shrink-0 w-[171.35px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">ORD-4828</p>
      </div>
    </div>
  );
}

function Data29() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[17.945px] pt-[17.985px] px-[16px] relative shrink-0 w-[197.83px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">Mar 15, 2026</p>
      </div>
    </div>
  );
}

function Data30() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[17.945px] pt-[17.985px] px-[16px] relative shrink-0 w-[145.26px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">15 items</p>
      </div>
    </div>
  );
}

function Data31() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[17.945px] pt-[17.985px] px-[16px] relative shrink-0 w-[171.48px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">$3,200.00</p>
      </div>
    </div>
  );
}

function Background12() {
  return (
    <div className="bg-[#fff3e0] content-stretch flex items-start pb-[3.625px] pt-[3.605px] px-[12px] relative rounded-[20px] shrink-0" data-name="Background">
      <div className="capitalize flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#f57c00] text-[11.5px] whitespace-nowrap">
        <p className="leading-[17.25px]">Pending</p>
      </div>
    </div>
  );
}

function Data32() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15.72px] pt-[15.98px] px-[16px] relative shrink-0 w-[255.4px]" data-name="Data">
      <Background12 />
    </div>
  );
}

function Data33() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[17.945px] pt-[17.985px] px-[16px] relative shrink-0 w-[160.45px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">—</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[15.111px] py-[7.111px] relative rounded-[6px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5de] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[12px] text-center whitespace-nowrap">
        <p className="leading-[normal]">View</p>
      </div>
    </div>
  );
}

function Data34() {
  return (
    <div className="content-stretch flex flex-col items-start px-[16px] py-[14px] relative shrink-0 w-[168.67px]" data-name="Data">
      <Button4 />
    </div>
  );
}

function Row4() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data28 />
      <Data29 />
      <Data30 />
      <Data31 />
      <Data32 />
      <Data33 />
      <Data34 />
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
      <Row4 />
    </div>
  );
}

function Table() {
  return (
    <div className="content-stretch flex flex-col gap-[0.01px] items-start mb-[-0.01px] relative shrink-0 w-full" data-name="Table">
      <HeaderRow />
      <Body />
    </div>
  );
}

function ActiveOrders() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[32px] pb-[0.01px] right-[31.99px] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] top-[445.78px]" data-name="Active Orders">
      <HorizontalBorder2 />
      <Table />
    </div>
  );
}

function Container48() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[16px] whitespace-nowrap">
          <p className="leading-[24px]">Order History</p>
        </div>
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-px items-start leading-[0] not-italic pl-px pr-[0.99px] py-px relative shrink-0 text-[#3c4257] text-[13px] whitespace-nowrap" data-name="Paragraph">
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[normal]">01</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[normal]">/</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[normal]">01</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[normal]">/</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[normal]">2026</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[26.09px] relative shrink-0" data-name="Container">
      <Paragraph2 />
    </div>
  );
}

function Image() {
  return (
    <div className="relative shrink-0 size-[12.99px]" data-name="image">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.99 12.99">
        <g clipPath="url(#clip0_17_926)" id="image">
          <path d={svgPaths.p36cbff80} fill="var(--fill-0, black)" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p26d96c80} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_17_926">
            <rect fill="white" height="12.99" width="12.99" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ImageFill() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip p-[2px] relative shrink-0 size-[16.99px]" data-name="image fill">
      <Image />
    </div>
  );
}

function ButtonMenu() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[16.99px]" data-name="Button menu">
      <ImageFill />
    </div>
  );
}

function Container50() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative">
        <Container51 />
        <ButtonMenu />
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0" data-name="Input">
      <div className="content-stretch flex flex-col items-start overflow-clip px-[15.111px] py-[9.111px] relative rounded-[inherit]">
        <Container50 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5de] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[13px] whitespace-nowrap">
        <p className="leading-[19.5px]">to</p>
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-px items-start leading-[0] not-italic pl-px pr-[0.99px] py-px relative shrink-0 text-[#3c4257] text-[13px] whitespace-nowrap" data-name="Paragraph">
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[normal]">22</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[normal]">/</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[normal]">03</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[normal]">/</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[normal]">2026</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[20.98px] relative shrink-0" data-name="Container">
      <Paragraph3 />
    </div>
  );
}

function Image1() {
  return (
    <div className="relative shrink-0 size-[12.99px]" data-name="image">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.99 12.99">
        <g clipPath="url(#clip0_17_926)" id="image">
          <path d={svgPaths.p36cbff80} fill="var(--fill-0, black)" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p26d96c80} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_17_926">
            <rect fill="white" height="12.99" width="12.99" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ImageFill1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip p-[2px] relative shrink-0 size-[16.99px]" data-name="image fill">
      <Image1 />
    </div>
  );
}

function ButtonMenu1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[16.99px]" data-name="Button menu">
      <ImageFill1 />
    </div>
  );
}

function Container53() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative">
        <Container54 />
        <ButtonMenu1 />
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0" data-name="Input">
      <div className="content-stretch flex flex-col items-start overflow-clip px-[15.111px] py-[9.111px] relative rounded-[inherit]">
        <Container53 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5de] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container55() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pb-[0.105px] pt-[0.115px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13px] whitespace-nowrap">
          <p className="leading-[16.11px]">All Statuses</p>
        </div>
      </div>
    </div>
  );
}

function Options() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-center pl-[18.99px] pr-[32.33px] py-[9.111px] relative rounded-[6px] shrink-0" data-name="Options">
      <div aria-hidden="true" className="absolute border border-[#d1d5de] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Container55 />
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[15.111px] py-[7.111px] relative rounded-[6px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5de] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1b2a4a] text-[12px] text-center whitespace-nowrap">
        <p className="leading-[normal]">Apply</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-center flex flex-wrap gap-[0px_12px] items-center relative">
        <Input />
        <Container52 />
        <Input1 />
        <Options />
        <Button5 />
      </div>
    </div>
  );
}

function HorizontalBorder3() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[16.556px] pt-[20px] px-[23.99px] relative w-full">
          <Container48 />
          <Container49 />
        </div>
      </div>
    </div>
  );
}

function Cell7() {
  return (
    <div className="bg-[#f5f6fa] content-stretch flex flex-col items-start pb-[12.485px] pt-[11.275px] px-[16px] relative shrink-0 w-[213.9px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[11px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[16.5px]">Order ID</p>
      </div>
    </div>
  );
}

function Cell8() {
  return (
    <div className="bg-[#f5f6fa] content-stretch flex flex-col items-start pb-[12.485px] pt-[11.275px] px-[16px] relative shrink-0 w-[246.11px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[11px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[16.5px]">Date</p>
      </div>
    </div>
  );
}

function Cell9() {
  return (
    <div className="bg-[#f5f6fa] content-stretch flex flex-col items-start pb-[12.485px] pt-[11.275px] px-[16px] relative shrink-0 w-[183.56px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[11px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[16.5px]">Items</p>
      </div>
    </div>
  );
}

function Cell10() {
  return (
    <div className="bg-[#f5f6fa] content-stretch flex flex-col items-start pb-[12.485px] pt-[11.275px] px-[16px] relative shrink-0 w-[215.48px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[11px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[16.5px]">Total</p>
      </div>
    </div>
  );
}

function Cell11() {
  return (
    <div className="bg-[#f5f6fa] content-stretch flex flex-col items-start pb-[12.485px] pt-[11.275px] px-[16px] relative shrink-0 w-[235.11px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[11px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[16.5px]">Status</p>
      </div>
    </div>
  );
}

function Cell12() {
  return (
    <div className="bg-[#f5f6fa] content-stretch flex flex-col items-start pb-[12.485px] pt-[11.275px] px-[16px] relative shrink-0 w-[176.29px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[11px] tracking-[0.5px] uppercase whitespace-nowrap">
        <p className="leading-[16.5px]">Action</p>
      </div>
    </div>
  );
}

function HeaderRow1() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Header → Row">
      <Cell7 />
      <Cell8 />
      <Cell9 />
      <Cell10 />
      <Cell11 />
      <Cell12 />
    </div>
  );
}

function Data35() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.515px] pt-[16.265px] px-[16px] relative shrink-0 w-[213.9px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">ORD-4825</p>
      </div>
    </div>
  );
}

function Data36() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.515px] pt-[16.265px] px-[16px] relative shrink-0 w-[246.11px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">Mar 12, 2026</p>
      </div>
    </div>
  );
}

function Data37() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.515px] pt-[16.265px] px-[16px] relative shrink-0 w-[183.56px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">20 items</p>
      </div>
    </div>
  );
}

function Data38() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.515px] pt-[16.265px] px-[16px] relative shrink-0 w-[215.48px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">$4,560.00</p>
      </div>
    </div>
  );
}

function Background13() {
  return (
    <div className="bg-[#e8f5e9] relative rounded-[20px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-[3.625px] pt-[3.605px] px-[12px] relative">
        <div className="capitalize flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#2e7d32] text-[11.5px] whitespace-nowrap">
          <p className="leading-[17.25px]">Collected</p>
        </div>
      </div>
    </div>
  );
}

function Data39() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[14.556px] pt-[14px] px-[16px] relative shrink-0 w-[235.11px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <Background13 />
    </div>
  );
}

function Data40() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.515px] pt-[16.265px] px-[16px] relative shrink-0 w-[176.29px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#f57c00] text-[0px] whitespace-nowrap">
        <p className="leading-[20.25px] text-[13.5px]">Reorder</p>
      </div>
    </div>
  );
}

function Row5() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data35 />
      <Data36 />
      <Data37 />
      <Data38 />
      <Data39 />
      <Data40 />
    </div>
  );
}

function Data41() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.515px] pt-[16.265px] px-[16px] relative shrink-0 w-[213.9px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">ORD-4818</p>
      </div>
    </div>
  );
}

function Data42() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.515px] pt-[16.265px] px-[16px] relative shrink-0 w-[246.11px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">Mar 8, 2026</p>
      </div>
    </div>
  );
}

function Data43() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.515px] pt-[16.265px] px-[16px] relative shrink-0 w-[183.56px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">35 items</p>
      </div>
    </div>
  );
}

function Data44() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.515px] pt-[16.265px] px-[16px] relative shrink-0 w-[215.48px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">$7,230.00</p>
      </div>
    </div>
  );
}

function Background14() {
  return (
    <div className="bg-[#e8f5e9] relative rounded-[20px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-[3.625px] pt-[3.605px] px-[12px] relative">
        <div className="capitalize flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#2e7d32] text-[11.5px] whitespace-nowrap">
          <p className="leading-[17.25px]">Collected</p>
        </div>
      </div>
    </div>
  );
}

function Data45() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[14.556px] pt-[14px] px-[16px] relative shrink-0 w-[235.11px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <Background14 />
    </div>
  );
}

function Data46() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.515px] pt-[16.265px] px-[16px] relative shrink-0 w-[176.29px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#f57c00] text-[0px] whitespace-nowrap">
        <p className="leading-[20.25px] text-[13.5px]">Reorder</p>
      </div>
    </div>
  );
}

function Row6() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data41 />
      <Data42 />
      <Data43 />
      <Data44 />
      <Data45 />
      <Data46 />
    </div>
  );
}

function Data47() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.515px] pt-[16.265px] px-[16px] relative shrink-0 w-[213.9px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">ORD-4810</p>
      </div>
    </div>
  );
}

function Data48() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.515px] pt-[16.265px] px-[16px] relative shrink-0 w-[246.11px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">Mar 4, 2026</p>
      </div>
    </div>
  );
}

function Data49() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.515px] pt-[16.265px] px-[16px] relative shrink-0 w-[183.56px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">18 items</p>
      </div>
    </div>
  );
}

function Data50() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.515px] pt-[16.265px] px-[16px] relative shrink-0 w-[215.48px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">$3,890.00</p>
      </div>
    </div>
  );
}

function Background15() {
  return (
    <div className="bg-[#e8f5e9] relative rounded-[20px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-[3.625px] pt-[3.605px] px-[12px] relative">
        <div className="capitalize flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#2e7d32] text-[11.5px] whitespace-nowrap">
          <p className="leading-[17.25px]">Collected</p>
        </div>
      </div>
    </div>
  );
}

function Data51() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[14.556px] pt-[14px] px-[16px] relative shrink-0 w-[235.11px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <Background15 />
    </div>
  );
}

function Data52() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.515px] pt-[16.265px] px-[16px] relative shrink-0 w-[176.29px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#f57c00] text-[0px] whitespace-nowrap">
        <p className="leading-[20.25px] text-[13.5px]">Reorder</p>
      </div>
    </div>
  );
}

function Row7() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data47 />
      <Data48 />
      <Data49 />
      <Data50 />
      <Data51 />
      <Data52 />
    </div>
  );
}

function Data53() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.515px] pt-[16.265px] px-[16px] relative shrink-0 w-[213.9px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">ORD-4799</p>
      </div>
    </div>
  );
}

function Data54() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.515px] pt-[16.265px] px-[16px] relative shrink-0 w-[246.11px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">Feb 28, 2026</p>
      </div>
    </div>
  );
}

function Data55() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.515px] pt-[16.265px] px-[16px] relative shrink-0 w-[183.56px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">42 items</p>
      </div>
    </div>
  );
}

function Data56() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.515px] pt-[16.265px] px-[16px] relative shrink-0 w-[215.48px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">$9,100.00</p>
      </div>
    </div>
  );
}

function Background16() {
  return (
    <div className="bg-[#e8f5e9] relative rounded-[20px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-[3.625px] pt-[3.605px] px-[12px] relative">
        <div className="capitalize flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#2e7d32] text-[11.5px] whitespace-nowrap">
          <p className="leading-[17.25px]">Collected</p>
        </div>
      </div>
    </div>
  );
}

function Data57() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[14.556px] pt-[14px] px-[16px] relative shrink-0 w-[235.11px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <Background16 />
    </div>
  );
}

function Data58() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.515px] pt-[16.265px] px-[16px] relative shrink-0 w-[176.29px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#f57c00] text-[0px] whitespace-nowrap">
        <p className="leading-[20.25px] text-[13.5px]">Reorder</p>
      </div>
    </div>
  );
}

function Row8() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data53 />
      <Data54 />
      <Data55 />
      <Data56 />
      <Data57 />
      <Data58 />
    </div>
  );
}

function Data59() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.515px] pt-[16.265px] px-[16px] relative shrink-0 w-[213.9px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">ORD-4790</p>
      </div>
    </div>
  );
}

function Data60() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.515px] pt-[16.265px] px-[16px] relative shrink-0 w-[246.11px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">Feb 24, 2026</p>
      </div>
    </div>
  );
}

function Data61() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.515px] pt-[16.265px] px-[16px] relative shrink-0 w-[183.56px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">5 items</p>
      </div>
    </div>
  );
}

function Data62() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.515px] pt-[16.265px] px-[16px] relative shrink-0 w-[215.48px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">$680.00</p>
      </div>
    </div>
  );
}

function Background17() {
  return (
    <div className="bg-[#ffebee] relative rounded-[20px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-[3.625px] pt-[3.605px] px-[12px] relative">
        <div className="capitalize flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#d32f2f] text-[11.5px] whitespace-nowrap">
          <p className="leading-[17.25px]">Cancelled</p>
        </div>
      </div>
    </div>
  );
}

function Data63() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[14.556px] pt-[14px] px-[16px] relative shrink-0 w-[235.11px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <Background17 />
    </div>
  );
}

function Data64() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.515px] pt-[16.265px] px-[16px] relative shrink-0 w-[176.29px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#eaedf3] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[0px] whitespace-nowrap">
        <p className="leading-[20.25px] text-[13.5px]">Details</p>
      </div>
    </div>
  );
}

function Row9() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data59 />
      <Data60 />
      <Data61 />
      <Data62 />
      <Data63 />
      <Data64 />
    </div>
  );
}

function Data65() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.235px] pt-[16.265px] px-[16px] relative shrink-0 w-[213.9px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">ORD-4782</p>
      </div>
    </div>
  );
}

function Data66() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.235px] pt-[16.265px] px-[16px] relative shrink-0 w-[246.11px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">Feb 20, 2026</p>
      </div>
    </div>
  );
}

function Data67() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.235px] pt-[16.265px] px-[16px] relative shrink-0 w-[183.56px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">30 items</p>
      </div>
    </div>
  );
}

function Data68() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.235px] pt-[16.265px] px-[16px] relative shrink-0 w-[215.48px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#3c4257] text-[13.5px] whitespace-nowrap">
        <p className="leading-[20.25px]">$6,450.00</p>
      </div>
    </div>
  );
}

function Background18() {
  return (
    <div className="bg-[#e8f5e9] content-stretch flex items-start pb-[3.625px] pt-[3.605px] px-[12px] relative rounded-[20px] shrink-0" data-name="Background">
      <div className="capitalize flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#2e7d32] text-[11.5px] whitespace-nowrap">
        <p className="leading-[17.25px]">Collected</p>
      </div>
    </div>
  );
}

function Data69() {
  return (
    <div className="content-stretch flex flex-col items-start px-[16px] py-[14px] relative shrink-0 w-[235.11px]" data-name="Data">
      <Background18 />
    </div>
  );
}

function Data70() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16.235px] pt-[16.265px] px-[16px] relative shrink-0 w-[176.29px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#f57c00] text-[0px] whitespace-nowrap">
        <p className="leading-[20.25px] text-[13.5px]">Reorder</p>
      </div>
    </div>
  );
}

function Row10() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data65 />
      <Data66 />
      <Data67 />
      <Data68 />
      <Data69 />
      <Data70 />
    </div>
  );
}

function Body1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Body">
      <Row5 />
      <Row6 />
      <Row7 />
      <Row8 />
      <Row9 />
      <Row10 />
    </div>
  );
}

function Table1() {
  return (
    <div className="content-stretch flex flex-col gap-[0.01px] items-start relative shrink-0 w-full" data-name="Table">
      <HeaderRow1 />
      <Body1 />
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-px relative rounded-[6px] shrink-0 size-[33.99px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5de] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[13px] text-center whitespace-nowrap">
        <p className="leading-[normal]">‹</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#f57c00] content-stretch flex items-center justify-center p-px relative rounded-[6px] shrink-0 size-[33.99px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#f57c00] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-center text-white whitespace-nowrap">
        <p className="leading-[normal]">1</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-px relative rounded-[6px] shrink-0 size-[33.99px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5de] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[13px] text-center whitespace-nowrap">
        <p className="leading-[normal]">2</p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-px relative rounded-[6px] shrink-0 size-[33.99px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5de] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[13px] text-center whitespace-nowrap">
        <p className="leading-[normal]">3</p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-px relative rounded-[6px] shrink-0 size-[33.99px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5de] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[13px] text-center whitespace-nowrap">
        <p className="leading-[normal]">…</p>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-px relative rounded-[6px] shrink-0 size-[33.99px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5de] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[13px] text-center whitespace-nowrap">
        <p className="leading-[normal]">8</p>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-px relative rounded-[6px] shrink-0 size-[33.99px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5de] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7385] text-[13px] text-center whitespace-nowrap">
        <p className="leading-[normal]">›</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[6px] items-center justify-end px-[24px] py-[16px] relative w-full">
          <Button6 />
          <Button7 />
          <Button8 />
          <Button9 />
          <Button10 />
          <Button11 />
          <Button12 />
        </div>
      </div>
    </div>
  );
}

function OrderHistory() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[32px] right-[31.99px] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] top-[852.38px]" data-name="Order History">
      <HorizontalBorder3 />
      <Table1 />
      <Container56 />
    </div>
  );
}

function Main() {
  return (
    <div className="h-[1426.37px] relative shrink-0 w-full z-[1]" data-name="Main">
      <SummaryCards />
      <OrderStatusTracker />
      <ActiveOrders />
      <OrderHistory />
    </div>
  );
}

function MainContent() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start min-h-px min-w-px relative self-stretch" data-name="MAIN CONTENT">
      <Header />
      <Main />
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[1490.36px] min-h-[764.4439697265625px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center min-h-[inherit] pl-[240px] relative size-full">
          <MainContent />
        </div>
      </div>
    </div>
  );
}

export default function Component1591WDefault() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="1591w default" style={{ backgroundImage: "linear-gradient(90deg, rgb(245, 246, 250) 0%, rgb(245, 246, 250) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <NavSidebar />
      <Container18 />
    </div>
  );
}