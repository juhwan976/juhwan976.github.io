import { describe, expect, it } from 'vitest';
import {
  getAdjacentProjects,
  getProjectBySlug,
  projects,
} from '@/content/projects';

describe('projects content', () => {
  it('프로젝트는 3개이며 slug가 중복되지 않는다', () => {
    expect(projects).toHaveLength(3);
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('프로젝트 번호가 노출 순서와 일치한다', () => {
    projects.forEach((project, index) => {
      expect(project.number).toBe(String(index + 1).padStart(2, '0'));
    });
  });

  it('slug로 프로젝트를 조회할 수 있다', () => {
    expect(getProjectBySlug('lgsc')?.name).toBe('LGSC');
    expect(getProjectBySlug('unknown')).toBeUndefined();
  });

  it('이전/다음 프로젝트가 순환한다', () => {
    const first = projects[0];
    const last = projects[projects.length - 1];
    const adjacent = getAdjacentProjects(first.slug);
    expect(adjacent?.previous.slug).toBe(last.slug);
    expect(adjacent?.next.slug).toBe(projects[1].slug);
    expect(getAdjacentProjects('unknown')).toBeUndefined();
  });

  it('모든 프로젝트가 상세 페이지 필수 콘텐츠를 갖는다', () => {
    projects.forEach((project) => {
      expect(project.background.length).toBeGreaterThan(0);
      expect(project.myRole.length).toBeGreaterThan(0);
      expect(project.challenges.length).toBeGreaterThan(0);
      expect(project.decisions.length).toBeGreaterThan(0);
      expect(project.results.length).toBeGreaterThan(0);
      expect(project.gallery.length).toBeGreaterThan(0);
    });
  });
});
