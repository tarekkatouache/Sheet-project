def callback(commit):
    if commit.author_name == b"Your Name" or commit.author_email == b"user@example.com":
        commit.author_name = b"Tarek Katouache"
        commit.author_email = b"katouache2000@gmail.com"
    if commit.committer_name == b"Your Name" or commit.committer_email == b"user@example.com":
        commit.committer_name = b"Tarek Katouache"
        commit.committer_email = b"katouache2000@gmail.com"
