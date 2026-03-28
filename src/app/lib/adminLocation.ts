type AdminOutletLocation = {
  code: string;
  outletId: number;
  outletLabel: string;
  outletShortName: string;
};

const FALLBACK_LOCATION: AdminOutletLocation = {
  code: "6767",
  outletId: 1,
  outletLabel: "Valu$ Jurong East",
  outletShortName: "Jurong East",
};

const ADMIN_LOCATION_BY_EMAIL: Record<string, AdminOutletLocation> = {
  "admin@valus.com": FALLBACK_LOCATION,
  "tampines@valus.com": {
    code: "6868",
    outletId: 2,
    outletLabel: "Valu$ Tampines Hub",
    outletShortName: "Tampines",
  },
  "woodlands@valus.com": {
    code: "6969",
    outletId: 3,
    outletLabel: "Valu$ Woodlands",
    outletShortName: "Woodlands",
  },
  "bedok@valus.com": {
    code: "7070",
    outletId: 4,
    outletLabel: "Valu$ Bedok Central",
    outletShortName: "Bedok Central",
  },
};

const ADMIN_LOCATION_BY_CODE: Record<string, AdminOutletLocation> = {
  "6767": FALLBACK_LOCATION,
  "6868": {
    code: "6868",
    outletId: 2,
    outletLabel: "Valu$ Tampines Hub",
    outletShortName: "Tampines",
  },
  "6969": {
    code: "6969",
    outletId: 3,
    outletLabel: "Valu$ Woodlands",
    outletShortName: "Woodlands",
  },
  "7070": {
    code: "7070",
    outletId: 4,
    outletLabel: "Valu$ Bedok Central",
    outletShortName: "Bedok Central",
  },
};

function readSessionStorageValue(key: string) {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(key);
}

export function resolveAdminLocation(
  email?: string | null,
  code?: string | null,
): AdminOutletLocation {
  if (code && ADMIN_LOCATION_BY_CODE[code]) {
    return ADMIN_LOCATION_BY_CODE[code];
  }

  if (email && ADMIN_LOCATION_BY_EMAIL[email]) {
    return ADMIN_LOCATION_BY_EMAIL[email];
  }

  return FALLBACK_LOCATION;
}

export function getStoredAdminLocation(): AdminOutletLocation {
  return resolveAdminLocation(
    readSessionStorageValue("adminEmail"),
    readSessionStorageValue("adminCode"),
  );
}

export function storeAdminLocation(location: AdminOutletLocation) {
  if (typeof window === "undefined") return;

  window.sessionStorage.setItem("adminCode", location.code);
  window.sessionStorage.setItem("adminOutletId", String(location.outletId));
  window.sessionStorage.setItem("adminOutletLabel", location.outletLabel);
  window.sessionStorage.setItem("adminOutletShortName", location.outletShortName);
}

export type { AdminOutletLocation };
