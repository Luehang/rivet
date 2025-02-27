import { css } from '@emotion/react';
import { type FC } from 'react';
import { useGraphHistoryNavigation } from '../hooks/useGraphHistoryNavigation';
import { ReactComponent as LeftIcon } from 'majesticons/line/chevron-left-line.svg';
import { ReactComponent as RightIcon } from 'majesticons/line/chevron-right-line.svg';
import { ReactComponent as CrossIcon } from 'majesticons/line/multiply-line.svg';
import { useRecoilState } from 'recoil';
import { searchingGraphState } from '../state/graphBuilder';

const styles = css`
  position: fixed;
  top: 50px;
  left: 275px;
  background: transparent;
  z-index: 50;
  display: flex;
  justify-content: flex-end;
  gap: 8px;

  &.sidebar-closed {
    left: 25px;
  }

  .button-placeholder {
    width: 32px;
    height: 32px;
  }

  button {
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    border-radius: 5px;
    background: transparent;
    padding: 8px;
    width: 32px;
    height: 32px;
    justify-content: center;
    box-shadow: 3px 1px 10px rgba(0, 0, 0, 0.4);

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    svg {
      width: 16px;
      height: 16px;
    }
  }

  .search {
    position: relative;
    input {
      background: var(--grey-dark);
      border: none;
      border-radius: 4px;
      padding: 4px 8px;
      color: var(--grey-lightest);
      width: 200px;
      height: 32px;
      font-size: 14px;
      font-family: var(--font-family);
      font-weight: 500;
      box-shadow: 3px 1px 10px rgba(0, 0, 0, 0.4);
    }

    .stopSearching {
      position: absolute;
      right: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;

      width: 32px;
      height: 32px;

      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const NavigationBar: FC = () => {
  const navigationStack = useGraphHistoryNavigation();

  const [searching, setSearching] = useRecoilState(searchingGraphState);

  return (
    <div css={styles}>
      {navigationStack.hasBackward ? (
        <button onClick={navigationStack.navigateBack}>
          <LeftIcon />
        </button>
      ) : (
        <div className="button-placeholder" />
      )}

      {navigationStack.hasForward ? (
        <button onClick={navigationStack.navigateForward}>
          <RightIcon />
        </button>
      ) : (
        <div className="button-placeholder" />
      )}

      {searching.searching && (
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            autoFocus
            value={searching.query}
            onChange={(e) => setSearching({ searching: true, query: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setSearching({ searching: false, query: '' });
              }
            }}
          />
          <button className="stopSearching" onClick={() => setSearching({ searching: false, query: '' })}>
            <CrossIcon />
          </button>
        </div>
      )}
    </div>
  );
};
