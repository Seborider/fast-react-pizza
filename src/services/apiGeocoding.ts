export interface AddressDetailsResponse {
  locality?: string;
  city?: string;
  postcode?: string;
  countryName?: string;
}

export interface GetAddress {
  latitude: number;
  longitude: number;
}

export async function getAddress({
  latitude,
  longitude,
}: GetAddress): Promise<AddressDetailsResponse> {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`,
  );
  if (!res.ok) throw new Error("Failed getting address");
  return await res.json();
}
