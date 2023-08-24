import { Responsive, WidthProvider } from 'react-grid-layout';
import styled from 'styled-components';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

type LayoutProps = {
  i: string;
  title: string;
  text: string;
  category_id: number;
  x: number;
  y: number;
  w: number;
  h: number;
};

export function Grid({ layout }: LayoutProps[] | any) {
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
        {layout.map((item: LayoutProps) => {
          return (
            <GridItemWrapper key={item.i}>
              <GridItemContent>{item.text}</GridItemContent>
            </GridItemWrapper>
          );
        })}
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
