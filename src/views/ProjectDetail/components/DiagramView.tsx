import type { DiagramSpec } from '@/content/types';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import S from '@/views/ProjectDetail/components/DiagramView.styles';

// 아키텍처 다이어그램 — 스크롤 진입 시 흐름이 순차적으로 표시된다.
// 모션 감소 환경에서는 전역 transition 무효화로 즉시 최종 상태가 된다.
export default function DiagramView({
  diagram,
}: {
  readonly diagram: DiagramSpec;
}): React.ReactNode {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.3);

  return (
    <S.Wrap ref={ref}>
      <S.Title>{diagram.title}</S.Title>
      {diagram.type === 'flow' ? (
        <S.FlowList>
          {diagram.steps.map((step, index) => (
            <S.FlowStep key={step.title} $visible={inView} $index={index}>
              <h4>{step.title}</h4>
              {step.detail && <p>{step.detail}</p>}
            </S.FlowStep>
          ))}
        </S.FlowList>
      ) : (
        <S.SplitGrid>
          {[diagram.left, diagram.right].map((panel, index) => (
            <S.SplitPanel key={panel.title} $visible={inView} $index={index}>
              <h4>{panel.title}</h4>
              <ul>
                {panel.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </S.SplitPanel>
          ))}
        </S.SplitGrid>
      )}
    </S.Wrap>
  );
}
