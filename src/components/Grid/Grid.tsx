import { Responsive, WidthProvider, Layout, Layouts } from 'react-grid-layout';
import styled from 'styled-components';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { ChangeEvent, MouseEvent, useCallback } from 'react';
import Link from 'next/link';

const ResponsiveGridLayout = WidthProvider(Responsive);

type GridProps = {
  content: ContentProps[];
  handleAddContent: (MouseEvent: any) => void;
  handleUpdateLayout: (layouts: Layouts) => void;
};

type ContentProps = {
  i: string;
  title: string;
  text: string;
  category_id: number;
  x: number;
  y: number;
  w: number;
  h: number;
};

export function Grid({
  content,
  handleAddContent,
  handleUpdateLayout,
}: GridProps) {
  const originalLayouts = getFromLayouts('layouts');
  const [state, setState] = useState({
    breakpoints: 'lg',
    layouts: JSON.parse(JSON.stringify(originalLayouts)),
  });

  // layout: 현재 layout 배열 하나 반환
  // layouts: 각 breakpoint에 따른 layout 배열들 반환
  const onLayoutChange = (layout: Layout[], layouts: Layouts) => {
    saveToLayouts('layouts', layouts);
    setState((state) => ({
      ...state,
      layouts: layouts,
    }));
  };

  // breakpoint 변경
  const onBreakPointChange = (breakpoint: string) => {
    // console.log(breakpoint) // lg or md or sm or xs or xxs
    setState((state) => ({
      ...state,
      breakpoints: breakpoint,
    }));
  };

  const handleSaveLayout = (e: MouseEvent) => {
    e.preventDefault();
    // handleUpdateLayout(state.layouts);
    console.log(state.layouts);
  };

  return (
    <Root>
      <SResponsiveGridLayout
        layouts={{ lg: state.layouts.lg }}
        measureBeforeMount={true}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
        rowHeight={200}
        width={1000}
        containerPadding={[0, 0]}
        isResizable={true}
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
        onBreakpointChange={onBreakPointChange}
        compactType={null}
        // useCSSTransforms={true} // CSS에서 position 속성 대신 translate()를 사용 -> 페인트 단계에서 6배 빠름
      >
        {content.map((item: ContentProps) => {
          return (
            <GridItemWrapper key={item.i}>
              <GridItemContent>{item.title}</GridItemContent>
              <GridItemContent>{item.text}</GridItemContent>
            </GridItemWrapper>
          );
        })}
      </SResponsiveGridLayout>
      <Flex>
        <AddButton onClick={handleAddContent}>추가</AddButton>
        <AddButton onClick={handleSaveLayout}>레이아웃 DB에 저장</AddButton>
      </Flex>
    </Root>
  );
}

const getFromLayouts = (key: string): ContentProps[] => {
  let layouts: ContentProps[] = [];
  if (window.localStorage) {
    try {
      const item = window.localStorage.getItem(key);
      layouts = item ? JSON.parse(item) : [];
    } catch (e) {
      console.log('getFormLayouts 에러발생');
    }
  }
  return layouts;
};

const saveToLayouts = (key: string, value: Layouts) => {
  if (window.localStorage) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};

const GridItemWrapper = styled.div`
  background: #f5f5f5;
  cursor: pointer;
  border-radius: 10px;
  border: 4px solid #151757;
`;

const GridItemContent = styled.p`
  padding: 8px;
`;

const Root = styled.div`
  padding: 16px;
`;

const SResponsiveGridLayout = styled(ResponsiveGridLayout)`
  background-color: bisque;
  border-radius: 10px;
`;

const Flex = styled.div`
  display: flex;
`;

const AddButton = styled.button`
  width: 100px;
  height: 70px;
  background-color: lightblue;
  border-radius: 10px;
  text-align: center;
  border: 2px solid #5297d8;
`;
