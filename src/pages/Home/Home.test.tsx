import MajorProvider from '@components/MajorProvider';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import Home from './index';

describe('App 컴포넌트 테스트', () => {
  it('페이지에 공지사항 및 졸업요건 컴포넌트가 렌더링된다.', () => {
    render(
      <MajorProvider>
        <Home />
      </MajorProvider>,
      {
        wrapper: MemoryRouter,
      },
    );
    const notificationText = screen.getByText('공지사항');
    expect(notificationText).toBeInTheDocument();

    const requirementText = screen.getByText('졸업요건');
    expect(requirementText).toBeInTheDocument();
  });
});
