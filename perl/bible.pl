use LWP::Simple;
use feature 'unicode_strings';
use utf8;
use Encode;
use Mojo::DOM;
use Mojo::Collection;
use DateTime;
binmode(STDOUT, ":utf8");

my $vr = $ARGV[0];
my $vl = $ARGV[1];
my $cn = $ARGV[2];

my $url = "http://www.holybible.or.kr/B_$vr/cgi/bibleftxt.php?VR=$vr&VL=$vl&CN=$cn&CV=99";
my $html = get("$url");
my $dom = Mojo::DOM->new($html);

my $count = 1;

for my $li ($dom->find('li')->each) {
	my $text = $li;
	$text =~ s/\<.*?\>//g;
	$text =~ s/\s+$//g;
	$text =~ s/&quot;/\\\"/g;
	$text =~ s/&#39;/\'/g;
	print ",\n" if $count > 1;
	print "[" if $count == 1;
	print "\"$text\"";
	$count++;
}

print "]" if $count > 1;
