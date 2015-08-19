
all:
	tsc --jsx react --removeComments -m amd src/sparkbars.tsx --outDir build

clean:
	$(RM) -r build