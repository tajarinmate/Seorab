import GridLayout from 'react-grid-layout';
import { Responsive, WidthProvider } from 'react-grid-layout';
import styled from 'styled-components';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const layout = [
  { i: 'blue-eyes-dragon', x: 0, y: 0, w: 1, h: 1 },
  { i: 'dark-magician', x: 1, y: 0, w: 1, h: 1 },
  { i: 'kuriboh', x: 2, y: 0, w: 1, h: 1 },
  { i: 'spell-caster', x: 3, y: 0, w: 1, h: 1 },
  { i: 'summoned-skull', x: 4, y: 0, w: 1, h: 1 },
  { i: 'a', x: 0, y: 0, w: 1, h: 1 },
  { i: 'b', x: 1, y: 0, w: 1, h: 1 },
  { i: 'c', x: 2, y: 0, w: 1, h: 1 },
  { i: 'd', x: 3, y: 0, w: 1, h: 1 },
  { i: 'e', x: 4, y: 0, w: 1, h: 1 },
];

export default function Grid() {
  return (
    <Root>
      <ResponsiveGridLayout
        layouts={{ lg: layout }}
        measureBeforeMount={false}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
        rowHeight={300}
        width={1000}
        containerPadding={[0, 0]}
      >
        <GridItemWrapper key='blue-eyes-dragon'>
          <GridItemContent>Blue Eyes Dragon</GridItemContent>
        </GridItemWrapper>
        <GridItemWrapper key='dark-magician'>
          <GridItemContent>Dark Magician</GridItemContent>
        </GridItemWrapper>
        <GridItemWrapper key='kuriboh'>
          <GridItemContent>Kuriboh</GridItemContent>
        </GridItemWrapper>
        <GridItemWrapper key='spell-caster'>
          <GridItemContent>Spell Caster</GridItemContent>
        </GridItemWrapper>
        <GridItemWrapper key='summoned-skull'>
          <GridItemContent>Summoned Skull</GridItemContent>
        </GridItemWrapper>
        <GridItemWrapper key='a'>
          <GridItemContent>a</GridItemContent>
        </GridItemWrapper>
        <GridItemWrapper key='b'>
          <GridItemContent>b</GridItemContent>
        </GridItemWrapper>
        <GridItemWrapper key='c'>
          <GridItemContent>c</GridItemContent>
        </GridItemWrapper>
        <GridItemWrapper key='d'>
          <GridItemContent>d</GridItemContent>
        </GridItemWrapper>
        <GridItemWrapper key='e'>
          <GridItemContent>e</GridItemContent>
        </GridItemWrapper>
      </ResponsiveGridLayout>
    </Root>
  );
}

const GridItemWrapper = styled.div`
  background: #f5f5f5;
  cursor: pointer;
`;

const GridItemContent = styled.div`
  background-color: lightcoral;
  padding: 8px;
`;

const Root = styled.div`
  padding: 16px;
  display: flex;
  background-color: lightgreen;
`;
