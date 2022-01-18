import { Route, Routes as RouterRoutes } from 'react-router-dom';

import Books from './Books';
import Chapters from './Chapters';
import Verses from './Verses';
import Langs from './Langs';

export default function Routes() {
  return (
    <RouterRoutes>
      <Route index element={<Books />} />
      <Route path=":book" element={<Chapters />} />
      <Route path=":book/:chapter" element={<Verses />} />
      <Route path=":book/:chapter/lang" element={<Langs />} />
    </RouterRoutes>
  );
}
