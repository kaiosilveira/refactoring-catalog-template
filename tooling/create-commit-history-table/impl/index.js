export async function fetchReversedOneLineCommitHistory({ exec }) {
  return new Promise((resolve, reject) => {
    exec('git log --oneline --reverse --no-abbrev-commit', (err, stdout) => {
      if (err) {
        reject(err);
      } else {
        const commits = stdout.split('\n').map((commit) => {
          const firstSpaceIdx = commit.indexOf(' ');
          const [sha, msg] = [commit.substring(0, firstSpaceIdx), commit.substring(firstSpaceIdx + 1)];
          return { sha, msg };
        });

        resolve(commits);
      }
    });
  });
}
