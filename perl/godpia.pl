use LWP::Simple;
use feature 'unicode_strings';
use utf8;
use Encode;
use Mojo::DOM;
use Mojo::Collection;
use DateTime;
binmode(STDOUT, ":utf8");

my $vl = $ARGV[0];
my $cn = $ARGV[1];

my @books = (
"", "gen", "exo", "lev", "num", "deu", "jos", "jdg", "rut", "1sa", "2sa", "1ki", "2ki", "1ch", "2ch", "ezr", "neh", "est", "job", "psa", "pro", "ecc", "sng", "isa", "jer", "lam", "ezk", "dan", "hos", "jol", "amo", "oba", "jnh", "mic", "nam", "hab", "zep", "hag", "zec", "mal", "mat", "mrk", "luk", "jhn", "act", "rom", "1co", "2co", "gal", "eph", "php", "col", "1th", "2th", "1ti", "2ti", "tit", "phm", "heb", "jas", "1pe", "2pe", "1jn", "2jn", "3jn", "jud", "rev"
);

my $book = $books[$vl];

my $url = "http://bible.godpia.com/read/reading.asp?ver=easy&ver2=&vol=$book&chap=$cn&sec=";
my $html = get("$url");
my $dom = Mojo::DOM->new($html);

my $count = 1;

for my $span ($dom->find('span[class="txt"]')->each) {
	my $text = $span->all_text;

	$text =~ s/^\d+//g;
	$text =~ s/^\s+//g;
	$text =~ s/\s+$//g;
	$text =~ s/\"/\\\"/g;
	print ",\n" if $count > 1;
	print "[" if $count == 1;
	print "\"$text\"";
	$count++;
}

print "]" if $count > 1;
