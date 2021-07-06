import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  status: 'idle',
  movie: {},
  users: []
};

// const ENDPOINT = "https://jsonplaceholder.typicode.com/posts";
const ENDPOINT = "https://star-wars-characters.glitch.me/api/search/";

export const userAsync = createAsyncThunk(
  'counter/fetchCount', async (term) => {
    const response = await fetch(ENDPOINT + term);
    // console.log(response.json());
    const data = await response.json();
    // console.log(data.results);
    // the returned will be the payload
    return data.results
  }
);

export const fetchMovie = createAsyncThunk(
  'countessr/fetchmovie',
  async () => {
    const response = await fetch('https://swapi.dev/api/people/1/')
    const data = await response.json();
    // console.log(data);
    return data
  }
);

export const counterSlice = createSlice({
  name: 'counterhaibhai',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },

  extraReducers: {
    [fetchMovie.pending]: (state) => {
      state.status = 'loading'
      state.movie = {}
    },
    [fetchMovie.fulfilled]: (state, action) => {
      state.status = 'success'
      state.movie = action.payload
    },
    [fetchMovie.rejected]: (state) => {
      state.status = 'error'
      state.movie = {}
    },

    [userAsync.pending]: (state) => {
      state.status = 'loading'
    },

    [userAsync.fulfilled]: (state, action) => {
      state.status = 'success'
      state.users = action.payload
    }
    ,
    [userAsync.rejected]: (state) => {
      state.status = 'error';
      state.users = ''
    }

  }

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = 'idle';
  //       state.value += action.payload;
  //       state.movie = action.payload
  //     })
  //     .addCase(incrementAsync.rejected, (state, action) => {
  //       state.status = 'error'
  //     })
  // },

  // extraReducers: {
  //   [incrementAsync.pending]: (state, action) => {
  //     state.status = 'loading'
  //   },

  //   [incrementAsync.fulfilled]: (state, action) => {
  //     state.status = 'success'
  //     state.movie = action.payload
  //   }
  //   ,
  //   [incrementAsync.rejected]: (state, action) => {
  //     state.status = 'error';
  //     state.movie = []
  //   }
  // }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// selectors
export const selectCount = (state) => state.counter.value;
export const selectMovie = (state) => state.counter.movie;
export const selectStatus = (state) => state.counter.status;
export const selectUsers = (state) => state.counter.users;


export default counterSlice.reducer;
