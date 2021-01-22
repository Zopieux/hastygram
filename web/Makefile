ICONS = $(addprefix public/icon-,$(addsuffix .png,192 512))

all: $(ICONS)

public/icon-%.png: logo.svg
	inkscape -w $* -h $* -o $@ $<
