import DepartmentList from '@components/List/DepartmentList';
import useMajor from '@hooks/useMajor';
import { render, act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const routerToMock = jest.fn();

jest.mock('@hooks/useMajor');
global.alert = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => routerToMock,
}));

describe('학과선택 테스트', () => {
  const mockUseMajor = useMajor as jest.MockedFunction<typeof useMajor>;
  const mockSetMajor = jest.fn();

  beforeEach(() => {
    mockUseMajor.mockReturnValue({
      setMajor: mockSetMajor,
      major: '컴퓨터공학과',
    });
  });

  it('버튼 활성화 테스트', async () => {
    const collegName = '정보융합대학';
    render(
      <MemoryRouter initialEntries={[`/major-decision/${collegName}`]}>
        <Routes>
          <Route path="/major-decision/:college" element={<DepartmentList />} />
        </Routes>
      </MemoryRouter>,
    );

    const confirmButton = await screen.findByRole('button', {
      name: '선택완료',
    });
    expect(confirmButton).toBeDisabled();

    const college = await screen.findByText('컴퓨터인공지능학부');

    if (college === null) throw new Error('college is null');

    await act(async () => {
      await userEvent.click(college);
    });

    expect(confirmButton).toBeEnabled();
  });

  it('버튼 클릭 로직 테스트', async () => {
    const collegName = '정보융합대학';
    render(
      <MemoryRouter initialEntries={[`/major-decision/${collegName}`]}>
        <Routes>
          <Route path="/major-decision/:college" element={<DepartmentList />} />
        </Routes>
      </MemoryRouter>,
    );

    const confirmButton = await screen.findByRole('button', {
      name: '선택완료',
    });
    const college = await screen.findByText('컴퓨터인공지능학부');
    await act(async () => {
      await userEvent.click(college);
    });
    await userEvent.click(confirmButton);

    expect(mockSetMajor).toBeCalledWith('컴퓨터인공지능학부');
    expect(routerToMock).toBeCalledWith('/');
  });
});
