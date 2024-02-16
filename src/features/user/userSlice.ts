import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store.ts";
import {
  AddressDetailsResponse,
  getAddress,
} from "../../services/apiGeocoding.ts";

interface Position {
  latitude: number;
  longitude: number;
}

interface FetchAddressReturn {
  position: Position;
  address: string;
}

interface UserState {
  username: string;
  status: "idle" | "loading" | "failed" | "succeeded";
  position: Position;
  address: string;
  error: string;
}

function getPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAdress = createAsyncThunk<FetchAddressReturn>(
  "user/fetchAdress",
  async (): Promise<FetchAddressReturn> => {
    const positionObj = await getPosition();
    const position: Position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    const addressObj: AddressDetailsResponse = await getAddress(position);
    const address = `${addressObj.locality}, ${addressObj.city} ${addressObj.postcode}, ${addressObj.countryName}`;

    return { position, address };
  },
);

const initialState: UserState = {
  username: "",
  status: "idle",
  position: {
    latitude: 0,
    longitude: 0,
  },
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "succeeded";
      })
      .addCase(fetchAdress.rejected, (state) => {
        state.error =
          "There was a problem getting your location. Make sure to fill this field";
        state.status = "failed";
      });
  },
});

export const getUser = (state: RootState) => state.user;
export const { updateName } = userSlice.actions;

export default userSlice.reducer;
