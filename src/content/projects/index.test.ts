import { describe, expect, it } from 'vitest';
import { getAdjacentProjects, getProjectBySlug, projects } from '@/content/projects';

// 콘텐츠 데이터 무결성 — 화면이 기대하는 계약을 검증한다.
describe('projects content', () => {
  it('slug와 번호가 중복되지 않는다', () => {
    const slugs = projects.map((p) => p.slug);
    const numbers = projects.map((p) => p.number);
    expect(new Set(slugs).size).toBe(projects.length);
    expect(new Set(numbers).size).toBe(projects.length);
  });

  it('모든 프로젝트가 필수 콘텐츠를 갖는다', () => {
    for (const project of projects) {
      expect(project.name.length).toBeGreaterThan(0);
      expect(project.background.length).toBeGreaterThan(0);
      expect(project.highlights.length).toBeGreaterThan(0);
      expect(project.challenges.length).toBeGreaterThan(0);
      expect(project.gallery.length).toBeGreaterThan(0);
      expect(project.cardMedia.src.length).toBeGreaterThan(0);
    }
  });

  it('Key Challenge 블록이 프로젝트마다 정확히 하나 있다', () => {
    for (const project of projects) {
      const keyChallenges = project.challenges.filter(
        (challenge) => challenge.label === 'Key Challenge',
      );
      expect(keyChallenges).toHaveLength(1);
    }
  });

  // 첫 블록은 'Key {Challenge|Decision}', 이후는 순번을 이어받아 2번부터 시작한다.
  it('Challenge와 Decision 라벨이 동일한 넘버링 규칙을 따른다', () => {
    const expectedLabels = (kind: string, count: number): string[] => [
      `Key ${kind}`,
      ...Array.from({ length: count - 1 }, (_, index) => `${kind} ${index + 2}`),
    ];

    for (const project of projects) {
      expect(project.challenges.map((challenge) => challenge.label)).toEqual(
        expectedLabels('Challenge', project.challenges.length),
      );
      expect(project.decisions.map((decision) => decision.label)).toEqual(
        expectedLabels('Decision', project.decisions.length),
      );
    }
  });

  it('links가 있으면 라벨과 https URL을 갖는다', () => {
    for (const project of projects) {
      for (const link of project.links ?? []) {
        expect(link.label.length).toBeGreaterThan(0);
        expect(link.url).toMatch(/^https:\/\//);
      }
    }
  });

  it('slug로 프로젝트를 조회할 수 있다', () => {
    for (const project of projects) {
      expect(getProjectBySlug(project.slug)?.name).toBe(project.name);
    }
    expect(getProjectBySlug('unknown-slug')).toBeUndefined();
  });

  it('이전/다음 프로젝트가 순환한다', () => {
    const first = projects[0];
    const adjacent = getAdjacentProjects(first.slug);
    expect(adjacent?.previous.slug).toBe(projects[projects.length - 1].slug);
    expect(adjacent?.next.slug).toBe(projects[1].slug);
  });
});
