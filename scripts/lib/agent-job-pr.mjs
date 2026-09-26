/** Decide how to publish a job branch without creating a duplicate PR. */
export function draftPrAction(existing, branch, id, bodyFile) {
  if (existing) {
    if (!existing.isDraft) throw new Error('existing PR is not a draft');
    if (!/^https:\/\/github[.]com\/[^/]+\/[^/]+\/pull\/[0-9]+$/.test(existing.url ?? '')) {
      throw new Error('existing PR has an invalid URL');
    }
    return { url: existing.url, args: null };
  }
  return { url: null, args: ['pr', 'create', '--draft', '--head', branch, '--title', `Agent improvement ${id}`, '--body-file', bodyFile] };
}
